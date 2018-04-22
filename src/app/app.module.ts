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
import { AppRoutingModule } from './/app-routing.module';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { SharedServiceService } from './shared-service.service';


@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventFormComponent,
    LoginFormComponent,
    NewAccountComponent,
    EventDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [EventService, MessageService, AuthenticationService, SharedServiceService],
  bootstrap: [AppComponent],
  entryComponents: [EventFormComponent, LoginFormComponent, NewAccountComponent]
})
export class AppModule { }
