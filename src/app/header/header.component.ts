import { Component, OnInit } from '@angular/core';
import {UserAuthService} from "../_services/user-auth.service";
import {Router} from "@angular/router";
import {UserService} from "../_services/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userAuthServise: UserAuthService,
              private router:Router,
              public userService: UserService
              ) { }

  ngOnInit(): void {
  }

  public isLoggedIn(){
    return this.userAuthServise.isLoggedIn();
  }

  public logout(){
    this.userAuthServise.clear();
    this.router.navigate(['/'])
  }

  public isAdmin(){
    return  this.userAuthServise.isAdmin();
  }

  public isUser(){
    return this.userAuthServise.isUser();
  }



}
