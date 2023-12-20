import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ContactService } from 'src/app/services/contact.service';
import { Geolocation, GeolocationPosition } from '@capacitor/geolocation';
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { from } from 'rxjs';

@Component({
  selector: 'app-update-contact',
  templateUrl: './update-contact.page.html',
  styleUrls: ['./update-contact.page.scss'],
})
export class UpdateContactPage implements OnInit {
  contacto: any = {};
  contactoId: any;
  selectedFile: Photo | null = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private contactService: ContactService,
    private storage: AngularFireStorage
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
      try {
        // Sube la nueva foto a Firebase Storage si hay una seleccionada
        let newPhotoUrl: string | undefined;
        if (this.selectedFile) {
          const imageString = await this.toBase64(this.selectedFile);
          const imagePath = `contact-images/${this.contacto.userId}/${this.contacto.name}`;
          const imageUploadTask = this.storage
            .ref(imagePath)
            .putString(imageString, 'data_url');
          const imageUrl = await from(imageUploadTask).toPromise();
          newPhotoUrl = await imageUrl?.ref.getDownloadURL();
        }

        // Obtén la posición geográfica antes de actualizar el contacto
        const position = await this.getCurrentPosition();

        // Actualiza la geolocalización en el objeto contacto
        this.contacto.geolocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        // Actualiza la URL de la foto si hay una nueva
        if (newPhotoUrl) {
          this.contacto.downloadUrl = newPhotoUrl;
        }

        // Actualiza el contacto en la base de datos
        await this.contactService.updateContact(this.contactoId, this.contacto);

        this.presentAlert('Contacto actualizado correctamente');
        this.router.navigate(['/dashboard/contact']);
      } catch (error) {
        this.presentAlert('Error al actualizar el contacto: ' + error);
      }
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
  async takePhoto() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      allowEditing: true,
      quality: 100,
    });
    this.selectedFile = photo;
  }

  async selectFromGallery() {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100,
    });
    this.selectedFile = photo;
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
