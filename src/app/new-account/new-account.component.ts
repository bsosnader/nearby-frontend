import { Component, OnInit } from '@angular/core';
import { account } from '../account.interface';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

  model: account = {email:'', password:''};

  ngOnInit() {
  }
  submitted = false;
  success_message = '';
  failure_message = '';
  constructor(private authenticationService: AuthenticationService){ }

  onSubmit() {
    this.submitted = true;
    console.log(this.model);
    this.authenticationService.signup(this.model.email, this.model.password)
            .subscribe(result => {
                console.log(result);
                if (result.statusText == "Created") {
                  this.success_message = "Account Created! You can log in now."
                }
                if (result.length == 0) {
                  this.failure_message = "Invalid username or password.";
                }
            }, (errror: any) => {
              this.failure_message = "Invalid username or password.";
            });

  }

}
