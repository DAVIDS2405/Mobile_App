import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ContactService } from 'src/app/services/contact.service';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.page.html',
  styleUrls: ['./update-contact.page.scss'],
})
export class UpdateContactPage implements OnInit {
  contacto: any = {};
  contactoId: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.contactoId = params.get('id');
      if (this.contactoId) {
        this.loadContacto(this.contactoId);
      } else {
        this.presentAlert('ID de contacto no válido');
      }
    });
  }

  async loadContacto(contactoId: string) {
    this.contactService.getContactById(contactoId).subscribe(
      (contacto) => {
        // Asegúrate de que el contacto no sea null antes de asignarlo
        if (contacto) {
          this.contacto = contacto;
        } else {
          this.presentAlert('Contacto no encontrado');
        }
      },
      (error) => {
        this.presentAlert('Error al cargar el contacto: ' + error);
      }
    );
  }

  async guardarCambios() {
    if (this.contacto.userId) {
      // Obtén la posición geográfica antes de actualizar el contacto
      const position = await this.getCurrentPosition();

      // Actualiza la geolocalización en el objeto contacto
      this.contacto.geolocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      this.contactService
        .updateContact(this.contactoId, this.contacto)
        .then(() => {
          this.presentAlert('Contacto actualizado correctamente');
          this.router.navigate(['/dashboard/contact']);
        })
        .catch((error) => {
          this.presentAlert('Error al actualizar el contacto: ' + error);
        });
    } else {
      this.presentAlert('ID de contacto no válido');
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  async getCurrentPosition(): Promise<GeolocationPosition> {
    // Utiliza Capacitor Geolocation para obtener la posición actual
    const position = await Geolocation.getCurrentPosition();
    return position;
  }
}
