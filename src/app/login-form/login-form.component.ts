import { Component, OnInit } from '@angular/core';
import { account } from '../account.interface';
import { AuthenticationService } from '../authentication.service';
import { SharedServiceService } from '../shared-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  model: account = {email:'', password:''};
  message = ''
  loggedIn = false;
  ngOnInit() {
    console.log("Help")
    if(localStorage.getItem('id_token')) {
      this.loggedIn = true;
      this.sharedService.emitLogin(true);
      console.log("help")
    }
  }
  submitted = false;
  constructor(private authenticationService: AuthenticationService, private sharedService: SharedServiceService, public modal: NgbActiveModal){

  }

  onSubmit() {
    this.submitted = true;
    this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.message = 'Login Success!'
                    console.log(this.message);
                    this.sharedService.emitLogin(true);
                    this.modal.close();
                } else {
                    // login failed
                    this.message = 'Username or password is incorrect';
                    console.log(this.message);
                    this.sharedService.emitLogin(false);
                }
            }, (error: any) =>{
              this.message = 'Username or password is incorrect';
              this.sharedService.emitLogin(false);
            });

  }

}
