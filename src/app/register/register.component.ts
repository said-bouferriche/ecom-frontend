import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {UserService} from "../_services/user.service";
import {UserAuthService} from "../_services/user-auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private _registerForm: NgForm | undefined;

  constructor(  private userService: UserService,
                private userAuthService: UserAuthService,
                private router:Router) { }

  ngOnInit(): void {
  }



  register(registerForm: NgForm) {
    this._registerForm = registerForm;
    this.userService.register(registerForm.value).subscribe(
      (response:any)=>{
        // this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        const role = response.user.role[0].roleName;
        this.router.navigate(['/user']);
      },(error)=>{
        console.log(error);
      }
    )
  }
}
