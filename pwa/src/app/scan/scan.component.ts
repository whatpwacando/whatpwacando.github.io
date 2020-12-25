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
import { BehaviorSubject, from, interval, Subscription, zip } from 'rxjs';
import { delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'slb-scan',
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
  fragments = [];
  codeData = [];
  missingInfo$ = new BehaviorSubject('');

  private scanTimeStep = 10; // ms
  private sub = new Subscription();
  private videStream = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.video = document.createElement('video');
    this.canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    this.canvas = this.canvasElement.getContext('2d');

    // Use facingMode: environment to attemt to get the front camera on phones
    const videoStreamSub: Subscription = from(
      navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
      })
    )
      .pipe(
        map((stream: any) => {

          this.video.srcObject = stream;
          this.video.setAttribute('playsinline', true); // required to tell iOS safari we don't want fullscreen
          this.video.setAttribute('webkit-playsinline', true);
          setTimeout(() => {
            this.playBtn.nativeElement.click();
          }, 1000);
          const { clientWidth }: any = this.container.nativeElement;
          this.canvasElement.height = clientWidth;
          this.canvasElement.width = clientWidth;

          return this.scanTimeStep;
        }),
        delay(1000),
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

      this.canvas.drawImage(
        this.video,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData: any = this.canvas.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      // const code: any = jsQR(imageData.data, imageData.width, imageData.height, {
      //     inversionAttempts: 'dontInvert',
      // });

      // this.codeDataAnalyzer(code);
    }
    requestAnimationFrame(() => this.tick);
  }

  close(): void {
    this.router.navigate([`dashboard`]);
  }

  startPlay() {
    console.log('22222')
    this.video.play();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private checkMissingData() {
    const missingIndexList = this.fragments.reduce((acc, curr, index) => {
      return curr ? acc : [...acc, index + 1];
    }, []);

    const { info, first, last } = missingIndexList.reduce(
      (acc, curr, index) => {
        const { info, first, last } = acc;

        if (index === 0) {
          return {
            info: '',
            first: curr,
            last: curr,
          };
        }

        if (curr - 1 === last) {
          return {
            info,
            first,
            last: curr,
          };
        }

        return {
          info: `${Boolean(info) ? `${info}, ` : ''}${
            first === last ? first : `${first}-${last}`
          }`,
          first: curr,
          last: curr,
        };
      },
      {}
    );

    this.missingInfo$.next(
      `Missing: ${info}, ${first === last ? first : `${first}-${last}`}`
    );
  }

  private unzip(b64Data: string): string {
    let strData = atob(b64Data);
    const binData = new Uint8Array(JSON.parse(`[${strData}]`));
    return '';
    // return pako.inflate(binData, { to: 'string' });
  }

  private codeDataAnalyzer(code: any): void {
    // if (!Boolean(code)) {
    //     return;
    // }
    // const data: any = code.data;
    // if (!Boolean(data.length)) {
    //     return;
    // }
    // const [head, info]: any = data.split(';');
    // const [first, second]: any = head.split('/');
    // const current: number = Number(first);
    // const total: number = Number(second);
    // if (isNaN(current) || isNaN(total)) {
    //     return;
    // }
    // if (this.fragments.length !== Number(total)) {
    //     this.fragments = new Array(total).fill(false);
    //     this.codeData = new Array(total).fill('');
    // }
    // this.fragments[current] = true;
    // this.codeData[current] = info;
    // this.checkMissingData();
    // const recievedAll: boolean = this.fragments.every((recieved: boolean) => recieved);
    // if (recievedAll) {
    //     this.isCompleted = true;
    //     const strData = this.codeData.join('');
    //     const unzipedString = this.unzip(strData);
    //     const transferData: ITransferData = JSON.parse(unzipedString);
    //     console.log('got all data', transferData);
    //     this.saveTransferData(transferData);
    // }
    // this.cdr.markForCheck();
  }

  private saveTransferData({ job, well, wire, unit, bhas }: any) {
    // const transferSub = zip(
    //     this.wellDBService.createOrUpdate(well.id, well),
    //     this.wireDBService.createOrUpdate(wire.id, wire),
    //     this.unitDBService.createOrUpdate(unit.id, unit),
    //     ...bhas.map((bha) => this.bhaDBService.createOrUpdate(bha.id, bha))
    // )
    //     .pipe(
    //         switchMap(() => this.jobDBService.createOrUpdate(job.id, job)),
    //         tap(() => {
    //             this.router.navigate([`../job/${job.id}/run`], { relativeTo: this.route });
    //         })
    //     )
    //     .subscribe();
    // this.sub.add(transferSub);
  }
}
