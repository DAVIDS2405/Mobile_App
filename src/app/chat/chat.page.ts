import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { HttpClient } from '@angular/common/http';
import { IonContent } from '@ionic/angular';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content : IonContent | undefined;
  messages: any[] = [];
  newMessage: string = '';
  randomUserUrl = 'https://randomuser.me/api/';

  username: string = 'Usuario'; // Puedes cambiar esto según tus necesidades


  constructor(private chatService: ChatService, private http: HttpClient) {}

  ngOnInit(): void {
    this.chatService.getMessages().subscribe((messages) => {
      this.messages = messages;
      this.scrollToBottom();
    });
    this.getRandomUser();
    this.scrollToBottom();
  }

  sendMessage(): void {
    if (this.newMessage.trim() !== '') {
      this.chatService.sendMessage(this.newMessage, this.username).then(() => {
        this.newMessage = '';
        this.scrollToBottom();
      });
    }
  }
  getRandomUser(): void {
    this.http.get<any>(this.randomUserUrl).subscribe((data) => {
      const user = data.results[0];
      this.username = `${user.name.first} ${user.name.last}`;
    });
  }
  scrollToBottom(): void {
    this.content?.scrollToBottom(200);
  }
}
