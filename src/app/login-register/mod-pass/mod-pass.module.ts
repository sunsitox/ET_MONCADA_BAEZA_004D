import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModPassPageRoutingModule } from './mod-pass-routing.module';

import { ModPassPage } from './mod-pass.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModPassPageRoutingModule
  ],
  declarations: [ModPassPage]
})
export class ModPassPageModule {}
