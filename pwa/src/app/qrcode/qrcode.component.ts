import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QrcodeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
