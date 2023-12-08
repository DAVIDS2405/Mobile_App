import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {
  user = {
    email: '',
    password: '',
  };
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private alertController: AlertController
  ) {}

  async onSignup() {
    try {
      const { email, password } = this.user;
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      // Si el registro es exitoso, redirige a la página deseada (por ejemplo, el inicio de sesión)
      this.router.navigate(['/home']);
    } catch (error:any) {
      console.error('Error al registrarse:', error);

      // Manejar errores y mostrar un mensaje al usuario
      let errorMessage = 'Error al registrarse.';

      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'La dirección de correo electrónico ya está en uso.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'La dirección de correo electrónico no es válida.';
          break;
        case 'auth/weak-password':
          errorMessage =
            'La contraseña es débil. Introduce una contraseña más segura.';
          break;

        default:
          break;
      }

      // Muestra un ion-alert con el mensaje de error
      this.presentAlert(errorMessage);
    }
  }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
