import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map,switchMap } from 'rxjs/operators';
import { GeolocationPosition } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  async createContact(
    name: string,
    lastName: string,
    phoneNumber: string,
    geolocation: GeolocationPosition
  ): Promise<any> {
    try {
      const user = await this.afAuth.currentUser;
      if (!user) {
        throw new Error('Usuario no autenticado');
      }

      const contactData = {
        name,
        lastName,
        phoneNumber,
        userId: user.uid,
        geolocation: {
          latitude: geolocation.coords.latitude,
          longitude: geolocation.coords.longitude,
        },
      };

      const result = await this.firestore
        .collection('contacts')
        .add(contactData);

      return result;
    } catch (error) {
      console.error(
        'Error al obtener la geolocalización o al almacenar en Firebase:',
        error
      );
      throw error;
    }
  }

  getContactsForCurrentUser(): Observable<any[]> {
    return this.afAuth.user.pipe(
      // Utilizamos switchMap para cambiar a un nuevo observable
      switchMap((user) => {
        if (!user) {
          throw new Error('Usuario no autenticado');
        }

        // Devolvemos el observable directamente
        return this.firestore
          .collection('contacts', (ref) => ref.where('userId', '==', user.uid))
          .snapshotChanges()
          .pipe(
            map((snaps) => {
              return snaps.map((snap) => {
                const data = snap.payload.doc.data() as { [key: string]: any };
                const id = snap.payload.doc.id;
                return { id, ...data };
              });
            })
          );
      })
    );
  }
  deleteContact(contactId: string) {
    return this.firestore.collection('contacts').doc(contactId).delete();
  }
  updateContact(contactId: string, updatedContact: any) {
    return this.firestore
      .collection('contacts')
      .doc(contactId)
      .update(updatedContact);
  }
  getContactById(contactId: string): Observable<any> {
    return new Observable((observer) => {
      this.afAuth.currentUser.then((user) => {
        if (user) {
          const contactRef = this.firestore
            .collection('contacts')
            .doc(contactId);
          contactRef.get().subscribe(
            (doc) => {
              if (doc.exists) {
                const contactData = doc.data();
                observer.next(contactData);
              } else {
                observer.error('Contacto no encontrado');
              }
            },
            (error) => {
              observer.error(error);
            }
          );
        }
      });
    });
  }
}
