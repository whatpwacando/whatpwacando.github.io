import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, from, interval, Observable } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { EventBusService } from './event-bus.service';

@Injectable({ providedIn: 'root' })
export class CheckForUpdateService {
    constructor(appRef: ApplicationRef, updates: SwUpdate, private eventBus: EventBusService) {
        const appIsStable$: Observable<boolean> = appRef.isStable.pipe(first((isStable: boolean): boolean => isStable));
        // tslint:disable-next-line:no-magic-numbers
        const everySixHours$: Observable<number> = interval(1000 * 60 * 60 * 6);
        const everySixHoursOnceAppIsStable$: Observable<any> = concat(appIsStable$, everySixHours$);

        everySixHoursOnceAppIsStable$
            .pipe(
                tap((): void => {
                    this.eventBus.checkForUpdate();
                }),
                switchMap((): Observable<any> => from(updates.checkForUpdate()))
            )
            .subscribe();
    }
}
