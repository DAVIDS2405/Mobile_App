import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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
  constructor(
    private contactService: ContactService,
    private router: Router,
    private alertController: AlertController
  ) {}

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
      this.presentAlert('Error al cargar los contactos');
    }
  }
  openGoogleMaps(latitude: number, longitude: number) {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
  }
  eliminarContacto(contactoId: string) {
    this.contactService
      .deleteContact(contactoId)
      .then(() => {
        this.presentAlert('Contacto eliminado');
        // Vuelve a cargar la lista de contactos después de eliminar
        this.loadContactos();
      })
      .catch((error) => {
        this.presentAlert('Error al eliminar el contacto');
      });
  }
  editarContacto(contactoId: string) {
    const ruta = '/dashboard/update-contact/' + contactoId;
    this.router.navigateByUrl(ruta);
  }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
