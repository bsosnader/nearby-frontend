import { Component, OnInit } from '@angular/core';
import { account } from '../account.interface';
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
  constructor(){ }

  onSubmit() {
    this.submitted = true;
    console.log(this.model);
  }

}
