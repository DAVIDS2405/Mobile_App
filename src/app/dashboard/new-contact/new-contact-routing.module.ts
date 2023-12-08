import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewContactPage } from './new-contact.page';

const routes: Routes = [
  {
    path: '',
    component: NewContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewContactPageRoutingModule {}
