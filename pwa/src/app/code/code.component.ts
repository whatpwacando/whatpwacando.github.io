import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { off } from 'process';
import { data } from './data';

declare const QRCode: any;

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeComponent implements OnInit {

  @ViewChild('container', { static: true }) codeContainer: ElementRef;
  currentCode = 1;
  totalCodes = 0;
  dataArray = [];
  codeInstance = null;
  constructor() { }

  ngOnInit(): void {
    this.generateDataArray();

    this.totalCodes = this.dataArray.length;

    const { clientWidth, clientHeight } = this.codeContainer.nativeElement;

    this.codeInstance = new QRCode(document.getElementById('code'), {
      text: this.dataArray[0],
      width: clientWidth - 40,
      height: clientWidth - 40,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  }

  generateDataArray(): void {
    const strData = JSON.stringify(data);
    const len = strData.length;

    const times = Math.ceil(len / 180);

    for (let i = 0; i < times; i++) {
      if (i === times - 1) {
        this.dataArray.push(`${i}/${len};${strData.substring(180 * i)}`);

        break;
      }

      this.dataArray.push(`${i}/${len};${strData.substr(i * 180, 180)}`);
    }

    console.log(this.dataArray, '====this.dataArray', this.dataArray[10].length);
  }

  changeCode(offset: number): void {
    const len = this.dataArray.length;

    if (offset === 1 && this.currentCode === len) { return; }
    if (offset === -1 && this.currentCode === 1) { return; }

    this.currentCode += offset;

    this.repaint(this.currentCode);
  }

  repaint(index: number): void {
    this.codeInstance.clear(); // clear the code.
    this.codeInstance.makeCode(this.dataArray[index]); // make another code.
  }
}
