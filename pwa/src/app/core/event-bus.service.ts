import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

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
}
