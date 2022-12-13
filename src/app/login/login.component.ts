import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _loginForm: NgForm | undefined;

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }

  login(loginForm:NgForm){
    this._loginForm = loginForm;
    this.userService.login(loginForm.value).subscribe(
      (response)=>{
        console.log(response);
      },(error)=>{
        console.log(error);
      }
    )
  }

}
