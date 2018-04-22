import { Component, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { EventFormComponent } from './event-form/event-form.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private modalService: NgbModal) {}

  title = 'Nearby';
  listview: boolean = true;
  open() {
    const modalRef = this.modalService.open(EventFormComponent);
    modalRef.componentInstance.name = 'World';
  }
}
