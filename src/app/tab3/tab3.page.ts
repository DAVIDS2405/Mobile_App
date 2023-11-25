import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  constructor(private menuCtrl: MenuController) {}
  scrollTo(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }


  openMenu() {
    this.menuCtrl.enable(true, 'start');
    this.menuCtrl.open('start');
  }

  closeMenu() {
    this.menuCtrl.close('start');
  }
}
