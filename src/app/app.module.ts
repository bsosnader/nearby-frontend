import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EventService } from './event.service';
import { HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';
import { Http, HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EventListComponent } from './event-list/event-list.component';
import { MessageService } from './message.service';
import { EventFormComponent } from './event-form/event-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { AuthenticationService } from './authentication.service';


@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventFormComponent,
    LoginFormComponent,
    NewAccountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule
  ],
  providers: [EventService, MessageService, AuthenticationService],
  bootstrap: [AppComponent],
  entryComponents: [EventFormComponent, LoginFormComponent, NewAccountComponent]
})
export class AppModule { }
