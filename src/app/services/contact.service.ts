import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from } from 'rxjs';
import { map,switchMap } from 'rxjs/operators';
import { GeolocationPosition } from '@capacitor/geolocation';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {}

  async createContact(
    name: string,
    lastName: string,
    phoneNumber: string,
    geolocation: GeolocationPosition,
    imageFile: Photo
  ): Promise<any> {
    try {
      const user = await this.afAuth.currentUser;
      if (!user) {
        throw new Error('Usuario no autenticado');
      }
      const contactsCollection: AngularFirestoreCollection<any> =this.firestore.collection('contacts');

      const existingContacts = await contactsCollection.ref
        .where('userId', '==', user.uid)
        .where('name', '==', name)
        .where('lastName', '==', lastName)
        .where('phoneNumber', '==', phoneNumber)
        .get();

      if (!existingContacts.empty) {
        // Ya existe un contacto con la misma información
        throw new Error('Este contacto ya existe.');
      }
      const imageString = await this.toBase64(imageFile);
      const imagePath = `contact-images/${user.uid}/${name}`;
      const imageUploadTask = this.storage
        .ref(imagePath)
        .putString(imageString, 'data_url');
      const imageUrl = await from(imageUploadTask).toPromise();
      const downloadUrl = await imageUrl?.ref.getDownloadURL();

      const contactData = {
        name,
        lastName,
        phoneNumber,
        userId: user.uid,
        geolocation: {
          latitude: geolocation.coords.latitude,
          longitude: geolocation.coords.longitude,
        },
        downloadUrl,
      };

      const result = await this.firestore
        .collection('contacts')
        .add(contactData);

      return result;
    } catch (error) {
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

  private async toBase64(image: Photo): Promise<string> {
    try {
      if (!image || !image.webPath) {
        throw new Error('Image path is undefined or null');
      }

      const response = await fetch(image.webPath);

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const blob = await response.blob();

      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch (error) {

      throw error;
    }
  }
}
