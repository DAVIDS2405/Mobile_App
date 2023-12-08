import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  {
    path: '', // Ruta vacía para redirigir a 'dashboard/contact'
    redirectTo: 'contact',
    pathMatch: 'full',
  },
  {
    path: '',

    component: DashboardPage,
    children: [
      {
        path: 'contact',
        loadChildren: () =>
          import('./contact/contact.module').then((m) => m.ContactPageModule),
      },
      {
        path: 'new-contact',
        loadChildren: () =>
          import('./new-contact/new-contact.module').then(
            (m) => m.NewContactPageModule
          ),
      },
      {
        path: 'update-contact/:id',
        loadChildren: () =>
          import('./update-contact/update-contact.module').then(
            (m) => m.UpdateContactPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
