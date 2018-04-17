import { Component, OnInit } from '@angular/core';
import { account } from '../account.interface';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  model: account = {email:'', password:''};

  ngOnInit() {
  }
  submitted = false;
  constructor(){ }

  onSubmit() {
    this.submitted = true;
    console.log(this.model);
  }

}
