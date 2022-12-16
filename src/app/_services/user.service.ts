import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserAuthService} from "./user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _loginData: any;

  constructor(private httpclient: HttpClient,
              private userAuthService: UserAuthService) { }

  API_PATH = "http://localhost:9090";

  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  )

  public login(loginData: any){
    this._loginData = loginData;
    return this.httpclient.post(this.API_PATH + "/authenticate", loginData, {headers:this.requestHeader})
  }

  public forUser(){
    return this.httpclient.get(this.API_PATH + '/forUser',{
      responseType: "text",
    });
  }

  public forAdmin(){
    return this.httpclient.get(this.API_PATH + '/forAdmin',{
      responseType: "text",
    });
  }



  // @ts-ignore
  public roleMatch(allowedRoles: string | any[]) :boolean{
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    if (userRoles!= null && userRoles){
      for (let i=0; i<userRoles.length;i++){
        for (let j=0;j<allowedRoles.length; j++){
          if (userRoles[i].roleName === allowedRoles[j]){
            isMatch = true;
            return isMatch;
          }else {
            return isMatch;
          }
        }
      }
    }
  }
}
