import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth : boolean;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.authService.isAuth.subscribe(
      data => this.isAuth = data
    );

    if( !this.authService.checkAuthToken() ){
      this.router.navigate(['/login']);
    }
  }

}
