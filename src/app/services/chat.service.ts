import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private firestore: AngularFirestore) {}

  getMessages(): Observable<any[]> {
    return this.firestore
      .collection('messages', (ref) => ref.orderBy('timestamp'))
      .valueChanges({ idField: 'id' });
  }

  sendMessage(message: string, username: string): Promise<any> {
    return this.firestore.collection('messages').add({
      message,
      username,
      timestamp: new Date(),
    });
  }
}
