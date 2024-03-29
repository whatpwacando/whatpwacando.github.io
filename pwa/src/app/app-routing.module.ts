import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ImageDataTransferComponent } from './image-data-transfer/image-data-transfer.component';
import { QrcodeComponent } from './qrcode/qrcode.component';
import { ScanComponent } from './scan/scan.component';
import { CodeComponent } from './code/code.component';
import { ScanResultComponent } from './scan-result/scan-result.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'imageDataTransfer',
    component: ImageDataTransferComponent
  },
  {
    path: 'qrcode',
    component: QrcodeComponent
  },
  {
    path: 'scan',
    component: ScanComponent
  },
  {
    path: 'code',
    component: CodeComponent
  },
  {
    path: 'result',
    component: ScanResultComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
