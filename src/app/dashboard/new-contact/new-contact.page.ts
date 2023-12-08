import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ContactService } from 'src/app/services/contact.service';

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
    private contactService: ContactService,
    private alertController: AlertController
  ) {}

  async createNewContact() {
    try {
      await this.contactService.createContact(
        this.contactName,
        this.contactLastName,
        this.contactPhoneNumber
      );

      // Limpia los datos después de la creación del contacto
      this.clearFormData();

      // Muestra un mensaje de éxito
      this.presentAlert('Éxito', 'El contacto se creó correctamente.');
    } catch (error) {
      // Maneja el error y muestra un mensaje de error
      console.error('Error al crear el contacto:', error);
      this.presentAlert('Error', 'Hubo un error al crear el contacto.');
    }
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
