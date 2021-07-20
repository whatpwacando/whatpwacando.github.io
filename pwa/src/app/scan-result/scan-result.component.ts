import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EventBusService } from '../core/event-bus.service';

import * as echarts from 'echarts';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-scan-result',
  templateUrl: './scan-result.component.html',
  styleUrls: ['./scan-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScanResultComponent implements OnInit {
  result$: Observable<string>;
  imgSrc: SafeUrl;
  text = '';

  @ViewChild('chart', { static: true }) chart: ElementRef;
  constructor(private eventbus: EventBusService, private domSanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.eventbus.scanResult$.pipe(
      tap((data) => {
        console.log(data);
        this.imgSrc = this.domSanitizer.bypassSecurityTrustUrl(data.img[0]);
        this.text = data.text;
        this.addChart(data.chart);
      })
    ).subscribe();
  }

  addChart(data: Array<number>): void {
    const myChart = echarts.init(document.getElementById('myChart'));

    // specify chart configuration item and data
    const option = {
      title: {
        text: 'demo'
      },
      tooltip: {},
      legend: {
        data: ['Sales']
      },
      xAxis: {
        data: ["shirt", "cardign", "chiffon shirt", "pants", "heels", "socks"]
      },
      yAxis: {},
      series: [{
        name: 'Sales',
        type: 'bar',
        data
      }]
    };

    // use configuration item and data specified to show chart
    myChart.setOption(option);
  }

}
