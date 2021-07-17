import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsQR from 'jsqr';
import pako from 'pako';
import { BehaviorSubject, from, interval, Observable, Subscription, zip } from 'rxjs';
import { delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { EventBusService } from '../core/event-bus.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScanComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: true }) container: ElementRef;
  @ViewChild('playBtn', { static: true }) playBtn: ElementRef;

  canvas: any;
  video: any;
  canvasElement: any;

  isCompleted = false;
  isStarted = false;
  fragments: Array<boolean> = [];
  codeData = [];
  missingInfo$ = new BehaviorSubject('');
  status = 'No Started';

  private scanTimeStep = 10; // ms
  private sub = new Subscription();
  private ONE_SECOND = 1000;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private eventbus: EventBusService
  ) { }

  ngOnInit(): void {
    this.video = document.createElement('video');
    this.canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    this.canvas = this.canvasElement.getContext('2d');

    // Use facingMode: environment to attemt to get the front camera on phones
    const videoStreamSub: Subscription = from(navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }))
      .pipe(
        map((stream: any) => {
          this.video.srcObject = stream;
          this.video.setAttribute('playsinline', true); // required to tell iOS safari we don't want fullscreen
          this.video.setAttribute('webkit-playsinline', true);
          const { clientWidth }: any = this.container.nativeElement;
          this.canvasElement.height = clientWidth;
          this.canvasElement.width = clientWidth;

          return this.scanTimeStep;
        }),
        // delay(this.ONE_SECOND),
        // tap(() => {
        //     this.playBtn.nativeElement.click();
        // }),
        switchMap((timeStep: number) => interval(timeStep)),
        filter(() => !this.isCompleted && Boolean(this?.video)),
        tap(() => {
          this.tick();
        })
      )
      .subscribe();

    this.sub.add(videoStreamSub);
  }

  tick(): void {
    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.canvasElement.hidden = false;

      this.canvas.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);
      const imageData: any = this.canvas.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
      const code: any = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      this.codeDataAnalyzer(code);
    }
    requestAnimationFrame(() => this.tick);
  }

  close(): void {
    this.router.navigate([`dashboard`]);
  }

  startPlay(): void {
    this.isStarted = true;
    this.status = 'Scaning';
    this.video.play();
  }

  ngOnDestroy(): void {
    this.stopStreamedVideo();
    this.sub.unsubscribe();
  }

  private stopStreamedVideo(): void {
    const stream: any = this.video.srcObject;
    if (!Boolean(stream)) {
      return;
    }

    const tracks: Array<any> = stream.getTracks();

    tracks.forEach((track: any) => {
      track.stop();
    });

    this.video.srcObject = null;
  }

  private checkMissingData(): void {
    const missingIndexList: Array<number> = this.fragments.reduce((acc: Array<number>, curr: boolean, index: number) => {
      return curr ? acc : [...acc, index + 1];
    }, []);

    const { info, first, last }: any = missingIndexList.reduce((acc: any, curr: number, index: number) => {
      const { info: stepInfo, first: stepFirst, last: stepLast }: { info: string; first: number; last: number } = acc;

      if (index === 0) {
        return {
          info: '',
          first: curr,
          last: curr,
        };
      }

      if (curr - 1 === stepLast) {
        return {
          info: stepInfo,
          first: stepFirst,
          last: curr,
        };
      }

      return {
        info: `${Boolean(stepInfo) ? `${stepInfo}, ` : ''}${stepFirst === stepLast ? stepFirst : `${stepFirst}-${stepLast}`}`,
        first: curr,
        last: curr,
      };
    }, {});

    this.missingInfo$.next(`Missing: ${info}, ${first === last ? first : `${first}-${last}`}`);
  }

  private unzip(b64Data: string): string {
    const strData: string = atob(b64Data);
    const binData: Uint8Array = new Uint8Array(JSON.parse(`[${strData}]`));

    return pako.inflate(binData, { to: 'string' });
  }

  private codeDataAnalyzer(code: any): void {
    if (!Boolean(code)) {
      return;
    }

    const data: any = code.data;
    if (!Boolean(data.length)) {
      return;
    }

    const [head, info]: any = data.split(';');
    const [first, second]: any = head.split('/');

    const current: number = Number(first);
    const total: number = Number(second);

    if (isNaN(current) || isNaN(total)) {
      return;
    }

    if (this.fragments.length !== Number(total)) {
      this.fragments = new Array(total).fill(false);
      this.codeData = new Array(total).fill('');
    }

    this.fragments[current] = true;
    this.codeData[current] = info;

    this.checkMissingData();
    const recievedAll: boolean = this.fragments.every((recieved: boolean) => recieved);

    if (recievedAll) {
      this.isCompleted = true;
      const strData: string = this.codeData.join('');

      const unzipedString: string = this.unzip(strData);
      // console.log(unzipedString);
      // const transferData: any = JSON.parse(unzipedString);

      // console.log('got all data', transferData);
      this.stopStreamedVideo();
      this.saveTransferData(unzipedString);
    }

    this.cdr.markForCheck();
  }

  private saveTransferData(data): void {
    this.eventbus.setScanResult(data);
    this.router.navigate([`result`]);
  }
}
