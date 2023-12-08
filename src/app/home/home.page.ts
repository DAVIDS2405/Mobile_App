import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  user = {
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private alertController: AlertController
  ) {}
  async onLogin() {
    try {
      const { email, password } = this.user;
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );

      // Si el inicio de sesión es exitoso, redirige a la página deseada
      this.router.navigate(['/dashboard']);
    } catch (error: any) {
      // Verificar el tipo de error y mostrar un mensaje adecuado
      let errorMessage = 'Error al iniciar sesión.';

      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Usuario no encontrado. Por favor, regístrate.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta. Inténtalo de nuevo.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'El correo que has ingresado es incorrecto';
          break;
        case 'auth/invalid-credential':
          errorMessage = 'El usuario o la contraseña no son correctos';
          break;
        // Puedes agregar más casos según tus necesidades

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
  goToSignupPage() {
    this.router.navigate(['/signup']); // Asegúrate de tener una ruta definida para la página de registro
  }
}
