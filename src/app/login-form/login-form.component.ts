import { Component, OnInit } from '@angular/core';
import { account } from '../account.interface';
import { AuthenticationService } from '../authentication.service';
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
  }
  submitted = false;
  constructor(private authenticationService: AuthenticationService){
    if(localStorage.getItem('id_token')) {
      this.loggedIn = true;
    }
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.model);
    this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.message = 'Login Success!'
                    console.log(this.message);
                    console.log(JSON.parse(localStorage.getItem('id_token')))
                } else {
                    // login failed
                    this.message = 'Username or password is incorrect';
                }
            });

  }

}
