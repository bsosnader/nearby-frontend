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
  constructor(private authenticationService: AuthenticationService){ }

  onSubmit() {
    this.submitted = true;
    console.log(this.model);
    this.authenticationService.signup(this.model.email, this.model.password)
            .subscribe(result => {
                console.log(result);
            });

  }

}
