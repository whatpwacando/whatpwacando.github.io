import { Injectable } from '@angular/core';
import { SwUpdate, UpdateActivatedEvent, UpdateAvailableEvent } from '@angular/service-worker';
import { from, Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { EventBusService } from './event-bus.service';

@Injectable({ providedIn: 'root' })
export class UpdateService {
    constructor(public updates: SwUpdate, private eventBus: EventBusService) {
        this.listenForUpdate().subscribe();
        updates.activated.subscribe((event: UpdateActivatedEvent): void => {
            console.log('old version was', event.previous);
            console.log('new version is', event.current);
        });
    }

    public listenForUpdate(): Observable<any> {
        return this.updates.available.pipe(
            filter((event: UpdateAvailableEvent): boolean => Boolean(event.available)),
            switchMap(
                (event: UpdateAvailableEvent): Observable<any> => {
                    console.log('current version is', event.current);
                    console.log('available version is', event.available);

                    return from(
                        caches.keys().then(
                            (keyList: string[]): Promise<any> => {
                                return Promise.all(
                                    keyList.map(
                                        (key: string): Promise<any> => {
                                            if (key.indexOf(event.available.hash) === -1) {
                                                console.warn('[ServiceWorker] Removing old cache ===> ', key);

                                                return caches.delete(key);
                                            }
                                        }
                                    )
                                );
                            }
                        )
                    );
                }
            ),
            tap((): void => {
                this.eventBus.findNewVersion();
            })
        );
    }
}
