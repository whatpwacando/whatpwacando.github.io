import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EventBusService {
    private IDBOpended = new BehaviorSubject(false);
    // tslint:disable-next-line:member-ordering
    public IDBOpended$ = this.IDBOpended.asObservable();

    private checkingForUpdate = new BehaviorSubject(false);
    // tslint:disable-next-line:member-ordering
    public checkingForUpdate$ = this.checkingForUpdate.asObservable();

    private newVersion = new Subject();
    // tslint:disable-next-line:member-ordering
    public newVersion$ = this.newVersion.asObservable();

    private scanResult: BehaviorSubject<any> = new BehaviorSubject(null);
    // tslint:disable-next-line:member-ordering
    public scanResult$ = this.scanResult.asObservable().pipe(filter(value => value));

    public idbOpened(): void {
        this.IDBOpended.next(true);
    }

    public idbClosed(): void {
        this.IDBOpended.next(false);
    }

    public checkForUpdate(): void {
        this.checkingForUpdate.next(true);
    }

    public findNewVersion(): void {
        this.newVersion.next();
    }

    public setScanResult(data: any): void {
        this.scanResult.next(data);
    }
}
