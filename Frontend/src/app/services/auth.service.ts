import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { ApiPath } from "../enums/api";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(public http: HttpClient) {}

  register(object: any): Observable<any> {
    //Do register call to backend server
    return this.http.post(ApiPath.HOST + ApiPath.REGISTER, object);
  }

  login(object: any): Observable<any> {
    //Do login call to backend server
    return this.http.post(ApiPath.HOST + ApiPath.LOGIN, object);
  }
}
