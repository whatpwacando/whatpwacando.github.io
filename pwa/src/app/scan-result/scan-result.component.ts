import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EventBusService } from '../core/event-bus.service';

@Component({
  selector: 'app-scan-result',
  templateUrl: './scan-result.component.html',
  styleUrls: ['./scan-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScanResultComponent implements OnInit {
  result$: Observable<string>;
  constructor(private eventbus: EventBusService) {
  }

  ngOnInit(): void {
    this.result$ = this.eventbus.scanResult$.pipe(tap((data) => {
      // console.log(data);
    }));
  }

}
