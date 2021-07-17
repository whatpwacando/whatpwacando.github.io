import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImageDataTransferComponent } from './image-data-transfer/image-data-transfer.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { ScanComponent } from './scan/scan.component';
import { CodeComponent } from './code/code.component';
import { SharedModule } from './shared/shared.module';
import { ScanResultComponent } from './scan-result/scan-result.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ImageDataTransferComponent,
    QrcodeComponent,
    ScanComponent,
    CodeComponent,
    ScanResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
