import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  people = [
    {name: "Miguel Carapaz", image: "assets/icon/miguel.jpg"},
    {name: "Jose Pinos", image: "assets/icon/jose.png",},
    {name: "David Basantes", image: "assets/icon/david.webp"},

]
  constructor() {}

}
