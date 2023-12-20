import { Component, OnInit } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { ContactService } from 'src/app/services/contact.service';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.page.html',
  styleUrls: ['./new-contact.page.scss'],
})
export class NewContactPage implements OnInit {
  contactName: string = '';
  contactLastName: string = '';
  contactPhoneNumber: string = '';
  selectedFile: Photo | null = null;

  constructor(
    private router: Router,
    private contactService: ContactService,
    private alertController: AlertController,
    private platform: Platform
  ) {}

  ngOnInit() {
    Camera.requestPermissions();
  }

  async createNewContact() {
    try {
      // Obtén la posición geográfica antes de crear el contacto
      const position = await this.getCurrentPosition();
      if (!this.selectedFile) {
        throw new Error('Debes seleccionar una imagen de perfil.');
      }
      // Llama a la función para crear el contacto, pasando la posición geográfica
      await this.contactService.createContact(
        this.contactName,
        this.contactLastName,
        this.contactPhoneNumber,
        position,
        this.selectedFile
      );

      // Limpia los datos después de la creación del contacto
      this.clearFormData();
      this.router.navigate(['/dashboard/contact']);
      // Muestra un mensaje de éxito
      this.presentAlert('Éxito', 'El contacto se creó correctamente.');
    } catch (error: any) {
      // Maneja el error y muestra un mensaje de error

      this.presentAlert('Error', error.toString());
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
    this.selectedFile = null
  }

  async presentAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  async takePhoto () {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      allowEditing: true,
      quality: 100,
    });
    this.selectedFile = photo
  };

  async selectFromGallery() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100,
    });
    this.selectedFile = photo;
  }


}
