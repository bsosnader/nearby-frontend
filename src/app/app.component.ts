import { Component, Input } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { EventFormComponent } from './event-form/event-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NewAccountComponent } from './new-account/new-account.component';
import { AuthenticationService } from './authentication.service';
import { SharedServiceService } from './shared-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  collapsed = true;
  title = 'Nearby';
  loggedIn = false;
  listview: boolean = true;


  constructor(private modalService: NgbModal, private authenticationService: AuthenticationService, private sharedService: SharedServiceService, private router: Router) {
    sharedService.onLogin$.subscribe(
      bool => {
        console.log('here!!!')
        this.loggedIn = bool;
      });
      sharedService.onList$.subscribe(
        listview => {
          this.listview = listview;
        }
      )

  }

  ngOnInit() {
    if(localStorage.getItem('id_token')) {
      this.loggedIn = true;
    }

  }

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

  logout() {
    this.authenticationService.logout();
    //this.loggedIn = false;
    this.sharedService.emitLogin(false);
  }

   toggleCollapsed(): void {
     this.collapsed = !this.collapsed;
   }

   search(searchTerm: HTMLInputElement) {
     console.log(`User searched for: ${searchTerm.value}`)
     this.router.navigate(['list', {term: searchTerm.value}]);

   }

   change_listview(val: boolean) {
     this.sharedService.emitList(val);
   }


}
