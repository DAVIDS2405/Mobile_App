import { Component, ViewChild } from '@angular/core';
import { IonContent, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  @ViewChild(IonContent) ionContent!: IonContent;

  constructor(private modalController: ModalController) {}

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);

    if (element) {
      this.ionContent.scrollToPoint(0, element.offsetTop, 500);
    }
  }

  scrollToPerfil() {
    this.scrollToSection('Perfil');
  }

  scrollToDatosPersonales() {
    this.scrollToSection('Datos personales');
  }

  scrollToContacto() {
    this.scrollToSection('Contacto');
  }

  scrollToReferencias() {
    this.scrollToSection('Referencias');
  }

  scrollToHabilidades() {
    this.scrollToSection('Habilidades');
  }

  scrollToConocimientos() {
    this.scrollToSection('Conocimientos');
  }

  scrollToFormacion() {
    this.scrollToSection('Formacion');
  }

  scrollToExperiencia() {
    this.scrollToSection('Experiencia');
  }

}