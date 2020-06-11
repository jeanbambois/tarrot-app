import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }


  onTest(){
    var token = this.authService.getLocalToken();
    console.log(">> homepage.onTest: Token: " + token );
    console.log(">> homepage.onTest: Decoded Token: " + JSON.stringify(this.authService.getDecodedToken(token) ) );

    console.log("isToken expiraded ? " + this.authService.isTokenExpired());
  }

}
