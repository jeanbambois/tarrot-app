import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GameLobbyComponent } from './components/game-lobby/game-lobby.component';
import { HeaderComponent } from './components/header/header.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { GameListComponent } from './components/game-list/game-list.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/auth/login/login.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import {CookieService} from 'ngx-cookie-service';
import {TokenInterceptor} from './interceptors/token.interceptor';

const routes : Routes = [
  { path: 'users', component: UserListComponent},
  { path: 'games', component: GameListComponent},
  { path: 'lobby', component: GameLobbyComponent},
  { path: 'homepage', component: HomepageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signin', component: SigninComponent},
  { path: '', redirectTo:'/homepage', pathMatch:'full'},
  { path: '**', redirectTo:'/homepage', pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    GameLobbyComponent,
    HeaderComponent,
    HomepageComponent,
    GameListComponent,
    LoginComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
  ],
  providers: [
    CookieService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }

    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
