import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../common/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080';

  private authToken = "";

  constructor(private httpClient: HttpClient) { }

  getUserList() {
    this.refreshAuthToken();
    const searchUrl = `${this.baseUrl}/users`;
    /*
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authToken}`
    });
    let options = { headers: headers };

     */

    return this.httpClient.get<GetResponseUser>( searchUrl  /*, options */);
  }

  refreshAuthToken(){
    this.authToken = sessionStorage.getItem("TARROTLOG");
  }
}



interface GetResponseUser {
  _embedded:{
    users: User[];
  },
}
