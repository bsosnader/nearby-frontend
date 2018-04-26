import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class SharedServiceService {

    private onLoginSource = new Subject<boolean>();
    onLogin$ = this.onLoginSource.asObservable();

    emitLogin(logged_in: boolean) {
      this.onLoginSource.next(logged_in);
    }

    private onListSource = new BehaviorSubject<boolean>(true);
    onList$ = this.onListSource.asObservable();

    emitList(listview: boolean) {
      this.onListSource.next(listview);
    }

}
