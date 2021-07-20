import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import QRCode from 'qrcode';
import { interval, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
    selector: 'app-qrcode-generator',
    templateUrl: './qrcode-generator.component.html',
    styleUrls: ['./qrcode-generator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QrcodeGeneratorComponent implements OnInit, OnDestroy {
    currentIndex = 1;
    totalLength = 1;

    @ViewChild('codeContainer', { static: true }) codeContainer: ElementRef;
    @ViewChild('content', { static: true }) content: ElementRef;

    @Input() set text(text: string) {
        if (!Boolean(text)) {
            return;
        }
        const list: Array<string> = this.getCodeDataList(text);

        if (Boolean(this.intervalSub)) {
            this.intervalSub.unsubscribe();
        }

        if (list.length === 1) {
            this.generateQR(list[0]);
            this.currentIndex = 1;
            this.totalLength = 1;

            return;
        }

        this.displayCode(list);
    }
    @Input() maxCountPerPage = 500; // characters
    @Input() timestep = 200; // ms
    @Input() title = '';
    @Input() isAutoMode = true;

    @Output() exist = new EventEmitter();

    private codeSize = 200;
    private intervalSub: Subscription;

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        const { clientWidth, clientHeight }: any = this.content.nativeElement;
        this.codeSize = Math.min(clientWidth, clientHeight);
        this.generateQR('https://whatpwacando.github.io');
    }

    displayCode(list: Array<string>): void {
        const len: number = list.length;

        this.intervalSub = interval(this.timestep)
            .pipe(
                map((index: number) => index % len),
                tap((index: number) => {
                    this.currentIndex = index + 1;
                    this.totalLength = len;
                }),
                map((index: number) => list[index]),
                tap(this.generateQR),
                tap(() => {
                    this.cdr.markForCheck();
                })
            )
            .subscribe();
    }

    close(): void {
        this.exist.emit({});
    }

    ngOnDestroy(): void {
        if (Boolean(this.intervalSub)) {
            this.intervalSub.unsubscribe();
        }
    }

    private getCodeDataList(text: string): Array<string> {
        const len: number = text.length;

        const times: number = Math.ceil(len / this.maxCountPerPage);

        const countPerPage: number = Math.ceil(len / times);

        const list: Array<string> = [];

        for (let i = 0; i < times; i++) {
            if (i === times) {
                list.push(`${i}/${times};${text.substring(countPerPage * i)}`);

                break;
            }

            list.push(`${i}/${times};${text.substr(i * countPerPage, countPerPage)}`);
        }

        return list;
    }

    private generateQR(text: string): void {
        QRCode.toCanvas(
            document.getElementById('canvas'),
            text,
            {
                errorCorrectionLevel: 'L',
                height: this.codeSize - 40,
                width: this.codeSize - 40,
            },
            (error: any) => {
                if (error) {
                    console.error(error);
                }
            }
        );
    }
}
