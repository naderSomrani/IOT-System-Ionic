import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { NgxGaugeModule } from 'ngx-gauge';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { ColorPickerModule } from 'ngx-color-picker';

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxGaugeModule,
    SocketIoModule.forRoot(config),
    ColorPickerModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
