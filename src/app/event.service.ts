import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { MessageService } from './message.service';
import { Event } from './event';
import { newEvent } from './event-form/newEvent.interface';
// import { EVENTS } from './mock-events';


@Injectable()
export class EventService {
  private KEY = environment.gmap_api_key;
  private eventUrl = 'https://nearbyapi.gq/';
  //http://ec2-18-188-184-129.us-east-2.compute.amazonaws.com/

  constructor(private http: HttpClient,
  private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  getEvents(data: Object, searchTerm?: string, categories?: boolean): Observable<Event[]> {
    console.log(categories)
    console.log(searchTerm)
    let url = ''
    if(categories && searchTerm) {
      url = this.eventUrl + 'event/list/?categories=' + searchTerm;
    } else {
      url = searchTerm ? this.eventUrl + 'event/list/?search=' + searchTerm: this.eventUrl + 'event/list';
    }
    url = encodeURI(url)
    console.log(url)
    return this.http.get<Event[]>(url)
    .pipe(
      tap(events => this.log(`fetched events`)),
      catchError(this.handleError('getEvents', []))
    );
  }

  getEvent(id: string): Observable<Event> {
    return this.http.get<Event>(this.eventUrl + 'event/' + id + '/');
  }

  postUpvote(email: string, event_id: string, token: string): Observable<any> {
    // TODO: implement this-- figure out how to set up token + headers to make it work for JWT
    const body = JSON.stringify({user_email: email, event_id: event_id});
    const headers = new HttpHeaders({'Content-Type':'application/json','Accept':'application/json', 'Authorization': 'JWT ' + token});
    return this.http.post<any>(this.eventUrl + 'upvote', body, {headers: headers})

  }

  getLocFromAddr(addr: string): Observable<any> {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addr + '&key=' + this.KEY;
    url = encodeURI(url);
    console.log(url);
    return this.http.get<any>(url)
      .pipe(
        catchError(this.handleError('getLocFromAddr',[]))
      );
  }

  postEvent(event: newEvent, token: string): Observable<any> {
    const body = JSON.stringify(event);
    const headers = new HttpHeaders({'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': 'JWT ' + token});
    return this.http.post<any>(this.eventUrl + 'event/create/', body, {headers: headers});
  }

  postComment(comment_obj: Object, token: string) {
    const body = JSON.stringify(comment_obj);
    const headers = new HttpHeaders({'Content-Type':'application/json', 'Accept':'application/json', 'Authorization': 'JWT ' + token});
    return this.http.post<any>(this.eventUrl + 'comment/create', body, {headers: headers});
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(error);
    };
  }

}
