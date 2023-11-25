import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public projects = [
    {
      id: '1',
      title: 'Sistema de Ventas Java',
      imageUrl: 'https://www.manualweb.net/img/logos/java.png',
      repo: 'https://github.com/J-Pinos3/PROYECTO_sistema_ventas'
    },
    {
      id: '2',
      title: 'Aplicación Móvil de Ecommerce Kotlin',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Kotlin_Icon.svg/2048px-Kotlin_Icon.svg.png',
      repo: 'https://github.com/J-Pinos3/Saturnina'
    },
    {
      id: '3',
      title: 'Reproductor MP3 C++/QT',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Qt_logo_2016.svg/2560px-Qt_logo_2016.svg.png',
      repo: 'https://github.com/J-Pinos3/EJERCICIOS_CPP/tree/master/GestorCanciones'
    },
    {
      id: '4',
      title: 'Reproductor MP3 JAVA',
      imageUrl: 'https://www.manualweb.net/img/logos/java.png',
      repo: 'https://github.com/J-Pinos3/ReproductorMusicalJaVa'
    },
    {
      id: '5',
      title: 'Todo App C++/QT',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Qt_logo_2016.svg/2560px-Qt_logo_2016.svg.png',
      repo: 'https://github.com/J-Pinos3/EJERCICIOS_CPP/tree/master/TODO_app'
    },
    {
      id: '6',
      title: 'Ecommerce Web App Django',
      imageUrl: 'https://cdn.icon-icons.com/icons2/2415/PNG/512/django_original_logo_icon_146559.png',
      repo: 'https://github.com/J-Pinos3/EJERCICIOS_DJANGO/tree/PythonMarketplace'
    },
  ] 

  constructor() {}

  ngOnInit() {
  }
}
