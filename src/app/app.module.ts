import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EventService } from './event.service';
import { HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { Http, HttpModule } from '@angular/http';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { EventListComponent } from './event-list/event-list.component';
import { MessageService } from './message.service';
import { EventFormComponent } from './event-form/event-form.component';
import { MapsViewComponent } from './maps-view/maps-view.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { AuthenticationService } from './authentication.service';
import { AppRoutingModule } from './/app-routing.module';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { SharedServiceService } from './shared-service.service';
import { AgmDirectionModule } from 'agm-direction';

import { environment } from 'environments/environment';


import { FilterComponent } from './filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventFormComponent,
    MapsViewComponent,
    LoginFormComponent,
    NewAccountComponent,
    EventDetailComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.gmap_api_key
    }),
    AgmDirectionModule,
    HttpModule,
    AppRoutingModule,
    FileUploadModule
  ],
  providers: [EventService, MessageService, AuthenticationService, SharedServiceService],
  bootstrap: [AppComponent],
  entryComponents: [EventFormComponent, LoginFormComponent, NewAccountComponent]
})
export class AppModule { }
