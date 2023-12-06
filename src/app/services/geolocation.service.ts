import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {

  constructor(private firestore: AngularFirestore) {}

  getMessages(): Observable<any[]> {
    return this.firestore
      .collection('messages', (ref) => ref.orderBy('timestamp'))
      .valueChanges({ idField: 'id' });
  }

  sendCordinates(latitude: any , longitude: any): Promise<any> {
    const nombres =["Miguel Carapaz","Jose Pinos", "David Basantes"]
    return this.firestore.collection('localización').add({
      latitude,
      longitude,
      nombres,
      timestamp: new Date(),
    });
  }
}


