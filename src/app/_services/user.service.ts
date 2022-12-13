import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _loginData: any;

  constructor(private httpclient: HttpClient) { }

  API_PATH = "http://localhost:9090";

  requestHeader = new HttpHeaders(
    {"No-Auth":"True"}
  )

  public login(loginData: any){
    this._loginData = loginData;
    return this.httpclient.post(this.API_PATH + "/authenticate", loginData, {headers:this.requestHeader})
  }
}
