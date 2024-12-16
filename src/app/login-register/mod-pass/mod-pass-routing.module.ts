import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModPassPage } from './mod-pass.page';

const routes: Routes = [
  {
    path: '',
    component: ModPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModPassPageRoutingModule {}
