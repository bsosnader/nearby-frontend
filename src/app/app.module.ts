import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { EventService } from './event.service';
import { HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { EventListComponent } from './event-list/event-list.component';
import { MessageService } from './message.service';
import { EventFormComponent } from './event-form/event-form.component';


@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    EventFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule
  ],
  providers: [EventService, MessageService],
  bootstrap: [AppComponent],
  entryComponents: [EventFormComponent]
})
export class AppModule { }
