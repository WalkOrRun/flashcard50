import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import {AccountService} from '../account.service';
import { Account} from '../Account';
import {Router } from '@angular/router';
export type RouteTo = 'login';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  name:string;
  password:string;
  repassword:string;
  message:string;
  routing : RouteTo;

  toggleEditor(type: RouteTo) {
    this.routing = type;
  }
  get showLogin() {
    return this.routing === 'login';
  }

  constructor(private accService: AccountService, private router: Router) { }
  ngOnInit() {
  } 
  toLogin(){
    this.router.navigate(['/login']);
  }

  addNewAccount(){
    if(this.password!=this.repassword){
      this.message='password and Re-typed password have to be the same';
      this.password = '';
      this.repassword = '';
      return;
    }
    const newAcc={
      name:this.name,
      password:this.password
    }
    this.accService.createAccount(newAcc).subscribe(data => {
      console.log(data);
      this.name='';
      this.password='';
      this.repassword='';
      this.message='New Account Successfully Created! Will redirect to login page in 4 seconds';   
      setTimeout(()=>{ this.router.navigate(['/login']); }, 4000)
      
    });
  }
}
