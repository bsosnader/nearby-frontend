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
  ngOnInit() {
  }
  submitted = false;
  constructor(private authenticationService: AuthenticationService){ }

  onSubmit() {
    this.submitted = true;
    console.log(this.model);
    this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.message = 'Login Success!'
                    console.log(JSON.parse(localStorage.getItem('currentUser')))
                } else {
                    // login failed
                    this.message = 'Username or password is incorrect';
                }
            });

  }

}
