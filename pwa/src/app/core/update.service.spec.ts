import { TestBed } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';
import { of, Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { UpdateService } from './update.service';

const data: Subject<any> = new Subject();

describe('UpdateService', (): void => {
    let service: UpdateService;

    beforeEach((done: any): void => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: SwUpdate,
                    useValue: {
                        available: data,
                        activated: of({}),
                        checkForUpdate: (): Promise<void> => new Promise((resolve: any): void => resolve('')),
                    },
                },
            ],
        });
        caches
            .keys()
            .then(
                (keyList: string[]): Promise<any> => {
                    return Promise.all(keyList.map((key: string): Promise<any> => caches.delete(key)));
                }
            )
            .then((): void => {
                done();
            });

        service = TestBed.inject(UpdateService);
    });

    it('service should be created', (): void => {
        expect(service).toBeTruthy();
    });

    it('should get one cache in storage', (done: any): void => {
        caches.open('testcachename1').then(
            (cache: Cache): Promise<any> => {
                return fetch('../../assets/icons/splash.png')
                    .then(
                        (response: any): Promise<any> => {
                            if (!response.ok) {
                                throw new TypeError('bad response status');
                            }

                            return cache.put('test1', response);
                        }
                    )
                    .then((): void => {
                        data.next({
                            type: 'UPDATE_AVAILABLE',
                            current: {
                                hash: 'test',
                            },
                            available: {
                                hash: 'test',
                            },
                        });
                    });
            }
        );

        service
            .listenForUpdate()
            .pipe(take(1))
            .subscribe(
                async (): Promise<void> => {
                    const list: string[] = await caches.keys();
                    expect(list.length).toEqual(1);
                    done();
                }
            );
    });

    it('should remove old cache and add new one', (done: any): void => {
        caches.open('testname2').then(
            (cache: Cache): Promise<any> => {
                return fetch('../../assets/icons/splash.png')
                    .then(
                        (response: any): Promise<any> => {
                            if (!response.ok) {
                                throw new TypeError('bad response status');
                            }

                            return cache.put('new1', response);
                        }
                    )
                    .then((): void => {
                        data.next({
                            type: 'UPDATE_AVAILABLE',
                            current: {
                                hash: 'new',
                            },
                            available: {
                                hash: 'new',
                            },
                        });
                    });
            }
        );

        service
            .listenForUpdate()
            .pipe(take(1))
            .subscribe(
                async (): Promise<void> => {
                    const list: string[] = await caches.keys();
                    expect(list.length).toEqual(0);
                    done();
                }
            );
    });
});
