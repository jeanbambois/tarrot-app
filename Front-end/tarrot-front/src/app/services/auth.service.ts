import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Subject} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string = "http://localhost:8080";

  isAuth : BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private httpClient: HttpClient,
              private cookieService: CookieService) { }


  // Get the auth token from back-end API
  // Assign the token to a sessionStorage variable TARROTLOG
  requestToken(email: string, password: string){
    //setup variables for POST request
    const authURL = `${this.baseURL}/authentification`;
    let authHeaders = new HttpHeaders(
      {
        'Content-Type': 'application/json'
      });
    let authOptions = {
        headers: authHeaders,
        responseType: 'text'
      };
    let authBody =
      {
        email: email,
        password: password
      }

    console.log(">>> auth.service: requestToken");

    // @ts-ignore
    this.httpClient.post<string>( authURL, authBody, authOptions ).subscribe(
      (res) => {
          console.log(">>> auth.service: requestToken in req : {" + res +"}")
          sessionStorage.setItem('TARROTLOG', res + "");
          this.isAuth.next(true);
        },
      (error) => { console.log(error.message + "") },
      () => {}
    );

  }





  getLocalToken():string{
    return sessionStorage.getItem("TARROTLOG");
  }



  getDecodedToken(token: string): any {
    try{

      const tokenDecode = jwt_decode(token);
      return tokenDecode;
    }
    catch(Error){
      console.log(Error)
      return null;
    }
  }


  // return a boolean reflecting whether or not the token is expired
  // Token lifespan set to 10h in Spring security
  public isTokenExpired() {
    const tokenDecoded = this.getDecodedToken(this.getLocalToken());

    return (Date.now() > tokenDecoded.exp * 1000);
  }



  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
        //if(!this.isTokenExpired()){

        //}
        this.requestToken(email, password);
        resolve();
      });
  }



  logout(){
    sessionStorage.removeItem('TARROTLOG')
    this.isAuth.next(false);
  }

  checkAuthToken(): boolean {
    if(sessionStorage.getItem('TARROTLOG') != "" && sessionStorage.getItem('TARROTLOG') != null){
      this.isAuth.next(true);
      //console.log(">>> auth.service.ts : checkAuthToken - " + sessionStorage.getItem('TARROTLOG'));
      return true;
    } else {
      return false;
    }
  }

}
