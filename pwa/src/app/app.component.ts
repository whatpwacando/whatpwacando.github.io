import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CheckForUpdateService } from './core/check-update.service';
import { UpdateService } from './core/update.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor(private update: UpdateService, private checkUpdate: CheckForUpdateService) { }
}
