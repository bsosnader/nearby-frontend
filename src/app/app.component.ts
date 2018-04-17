import { Component, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { EventFormComponent } from './event-form/event-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NewAccountComponent } from './new-account/new-account.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private modalService: NgbModal) {}
  
  title = 'Nearby';

  event_open() {
    const modalRef = this.modalService.open(EventFormComponent);
    modalRef.componentInstance.name = 'World';
  }

  login_open() {
    const modalRef = this.modalService.open(LoginFormComponent);
    modalRef.componentInstance.name = 'login';
  }

  new_account_open() {
    const modalRef = this.modalService.open(NewAccountComponent);
    modalRef.componentInstance.name = 'new_acc';
  }


}
