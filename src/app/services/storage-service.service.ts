import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {share} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StorageServiceService implements OnDestroy {
    private onSubject = new Subject<{ key: string, value: any }>();
    public changes = this.onSubject.asObservable().pipe(share());

    constructor() {
        console.log('start storage service');
        this.start();
    }

    ngOnDestroy() {
        this.stop();
    }
/*
    public getStorage() {
        let s = [];
        for (let i = 0; i < localStorage.length; i++) {
            let value: any;
            if (value = localStorage.key(i)) {
                console.log(value);
                value = localStorage.getItem(value);
                console.log(value);
                s.push({
                    key: localStorage.key(i),
                    value: value
                });
            }

        }

        return s;
    }

    public store(key: string, data: any): void {
        localStorage.setItem(key, JSON.stringify(data));
        // the local application doesn't seem to catch changes to localStorage...
        this.onSubject.next({key: key, value: data})
    }

    public clear(key: string) {
        localStorage.removeItem(key);
        // the local application doesn't seem to catch changes to localStorage...
        this.onSubject.next({key: key, value: null});
    }
*/

    public start(): void {
        console.log('start');
        window.addEventListener("storage", this.storageEventListener.bind(this));
    }

    private storageEventListener(event: StorageEvent) {
        console.log('storageEventListener');
        if (event.storageArea == localStorage) {
            console.log(event);
            console.log(event.newValue);
            let v;
            try {
                if (event.newValue) {
                    v = JSON.parse(event.newValue);
                }
            } catch (e) {
                v = event.newValue;
            }
            if (event.key) {
                this.onSubject.next({key: event.key, value: v});
            }
        }
    }

    private stop(): void {
        window.removeEventListener("storage", this.storageEventListener.bind(this));
        this.onSubject.complete();
    }
}