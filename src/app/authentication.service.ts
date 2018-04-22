import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, HttpModule } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { of }         from 'rxjs/observable/of';

@Injectable()
export class AuthenticationService {
    public token: string;
    private basePath = 'http://ec2-18-188-184-129.us-east-2.compute.amazonaws.com';

    constructor(private http: Http, private messageService: MessageService) {
        // set token if saved in local storage
        var id_token = JSON.parse(localStorage.getItem('id_token'));
        this.token = id_token && id_token.token;
    }
 
    login(username: string, password: string): Observable<boolean> {
        let headers = new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        });
        let options = new RequestOptions({
          headers: headers
        });
        return this.http.post(this.basePath + '/api-token-auth/', JSON.stringify({ username: username, password: password }), options)
        .map((response: Response) => {
          // login successful if there's a jwt token in the response
          let token = response.json() && response.json().token;

          if (token) {
            // set token property
            this.token = token;

            // store username and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('id_token', JSON.stringify({ username: username, token: token }));

            // return true to indicate successful login
            return true;
          } else {
            // return false to indicate failed login
            return false;
          }
        });
    }

    signup(email: string, password: string): Observable<any> {
      let headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      });
      let options = new RequestOptions({
        headers: headers
      });
      return this.http.post(this.basePath + '/signup/', JSON.stringify({email: email, password: password}), options)
      .pipe(
        tap(heroes => this.log(`made account`)),
        catchError(this.handleError('signup', []))
      );

    }
 
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('id_token');
    }

    private log(message: string) {
      this.messageService.add('AuthService: ' + message);
    }

    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
}
