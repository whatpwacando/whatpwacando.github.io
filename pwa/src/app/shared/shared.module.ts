import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { QrcodeGeneratorComponent } from './qrcode-generator/qrcode-generator.component';

@NgModule({
    declarations: [
        QrcodeGeneratorComponent,
    ],
    imports: [FormsModule, CommonModule, RouterModule],
    exports: [
        QrcodeGeneratorComponent,
    ],
})
export class SharedModule { }
