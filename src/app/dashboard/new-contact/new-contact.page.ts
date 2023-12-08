import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ContactService } from 'src/app/services/contact.service';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.page.html',
  styleUrls: ['./new-contact.page.scss'],
})
export class NewContactPage {
  contactName: string = '';
  contactLastName: string = '';
  contactPhoneNumber: string = '';

  constructor(
    private router: Router,
    private contactService: ContactService,
    private alertController: AlertController
  ) {}

  async createNewContact() {
    try {
      // Obtén la posición geográfica antes de crear el contacto
      const position = await this.getCurrentPosition();

      // Llama a la función para crear el contacto, pasando la posición geográfica
      await this.contactService.createContact(
        this.contactName,
        this.contactLastName,
        this.contactPhoneNumber,
        position
      );

      // Limpia los datos después de la creación del contacto
      this.clearFormData();
      this.router.navigate(['/dashboard/contact']);
      // Muestra un mensaje de éxito
      this.presentAlert('Éxito', 'El contacto se creó correctamente.');
    } catch (error) {
      // Maneja el error y muestra un mensaje de error
      console.error('Error al crear el contacto:', error);
      this.presentAlert('Error', 'Hubo un error al crear el contacto.');
    }
  }

  async getCurrentPosition(): Promise<GeolocationPosition> {
    // Utiliza Capacitor Geolocation para obtener la posición actual
    const position: GeolocationPosition =
      await Geolocation.getCurrentPosition();
    return position;
  }

  clearFormData() {
    // Limpia los campos del formulario
    this.contactName = '';
    this.contactLastName = '';
    this.contactPhoneNumber = '';
  }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
