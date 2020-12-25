import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import jsQR from 'jsqr';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScanComponent implements OnInit, AfterViewInit {
  canvas: any;
  video: any;
  canvasElement: any;
  transfered = [];
  strData = [];
  total = 0;
  @ViewChild('play', { static: true }) playBtn: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.video = document.createElement('video');
    this.canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    this.canvas = this.canvasElement.getContext('2d');
    const _ = this;

    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        _.video.srcObject = stream;
        _.video.setAttribute('playsinline', true); // required to tell iOS safari we don't want fullscreen

        setTimeout(() => {
          _.playBtn.nativeElement.click();
        }, 2000);

        setInterval(() => {
          _.tick();
        }, 100);
      });
  }

  play() {
    this.video.play();
  }

  tick(): void {
    if (!this || !this.video) {
      return;
    }
    const loadingMessage = document.getElementById('loadingMessage');
    const outputContainer = document.getElementById('output');
    const outputMessage = document.getElementById('outputMessage');
    const outputData = document.getElementById('outputData');

    loadingMessage.innerText = '⌛ Loading video...';
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      loadingMessage.hidden = true;
      this.canvasElement.hidden = false;
      outputContainer.hidden = false;

      this.canvasElement.height = this.video.videoHeight;
      this.canvasElement.width = this.video.videoWidth;
      this.canvas.drawImage(
        this.video,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvas.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });
      if (code) {
        this.drawLine(
          code.location.topLeftCorner,
          code.location.topRightCorner,
          '#FF3B58'
        );
        this.drawLine(
          code.location.topRightCorner,
          code.location.bottomRightCorner,
          '#FF3B58'
        );
        this.drawLine(
          code.location.bottomRightCorner,
          code.location.bottomLeftCorner,
          '#FF3B58'
        );
        this.drawLine(
          code.location.bottomLeftCorner,
          code.location.topLeftCorner,
          '#FF3B58'
        );
        outputMessage.hidden = true;
        outputData.parentElement.hidden = false;
        console.log(code, 'cccc');

        const data = code.data;
        const [head, info] = data.split(';');
        const [current, total] = head.split('/');
        console.log(current, total, 'current, total');
        this.transfered = [
          ...new Set([...this.transfered, Number(current)].sort()),
        ];
        this.total = Number(total);
        outputData.innerText = info;
        this.strData[current] = info;

        this.cdr.markForCheck();
      } else {
        outputMessage.hidden = false;
        outputData.parentElement.hidden = true;
      }
    }
    requestAnimationFrame(this.tick);
  }

  drawLine(begin, end, color): void {
    this.canvas.beginPath();
    this.canvas.moveTo(begin.x, begin.y);
    this.canvas.lineTo(end.x, end.y);
    this.canvas.lineWidth = 4;
    this.canvas.strokeStyle = color;
    this.canvas.stroke();
  }
}
