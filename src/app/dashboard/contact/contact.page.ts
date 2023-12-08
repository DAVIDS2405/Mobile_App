import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  contactos: any[] = [];
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.loadContactos();
  }
  async loadContactos() {
    try {
      // Utiliza el servicio para obtener los contactos del usuario actual
      this.contactService.getContactsForCurrentUser().subscribe((contactos) => {
        this.contactos = contactos;
      });
    } catch (error) {
      console.error('Error al cargar los contactos:', error);
    }
  }
  openGoogleMaps(latitude: number, longitude: number) {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
  }
}
