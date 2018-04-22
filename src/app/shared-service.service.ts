import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SharedServiceService {

    private onLoginSource = new Subject<boolean>();
    onLogin$ = this.onLoginSource.asObservable();

    emitLogin(logged_in: boolean) {
      this.onLoginSource.next(logged_in);
    }


}
