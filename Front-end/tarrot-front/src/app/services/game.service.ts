import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Game} from '../common/game';
import {User} from '../common/user';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private baseUrl = 'http://localhost:8080';
  private authToken = "";

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }


  getGameList() {
    const searchUrl = `${this.baseUrl}/games`;


    return this.httpClient.get<GetResponseGame>(searchUrl);
  }


  getGameInfoPlayers(game: Game) {
    const playerInfoUrl = game._links.players.href;

    return this.httpClient.get<GetResponseUser>(playerInfoUrl);
  }


  // Create new Game object and insert users[] to the new game
  // then redirect to game list
  launchGame(players: User[]) {
    let baseUserURL = `${this.baseUrl}/users/`;
    let usersURL: string[] = [];
    let bodyPlayers: string = "";

    // Setting each user's access URL and adding it to the array
    for (let tempPlayer of players) {
      usersURL.push(baseUserURL + tempPlayer.id);
      bodyPlayers = bodyPlayers + baseUserURL + tempPlayer.id + "\n";
    }

    console.log(">>>>> BodyPlayers" + bodyPlayers);


    //    Post request to create new Game
    //    CallBack : Post request to add players to this game
    this.refreshAuthToken();
    let idNewGame = -1;
    let URLGame = `${this.baseUrl}/games`;
    let headersGame = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authToken}`
    });
    let optionsGame = {headers: headersGame};
    let bodyGame = {
      finished: false
    };

    let headersAddPlayersToGame = new HttpHeaders({
      'Content-Type': 'text/uri-list',
      'Authorization': `Bearer ${this.authToken}`
    });
    let optionsAddPlayersToGame = {headers: headersAddPlayersToGame};

    this.httpClient.post<Game>(URLGame, bodyGame, optionsGame).subscribe(
      res => {
        console.log(res);
        idNewGame = res.id
      },
      error => console.log(error.message),
      () => {
        this.httpClient.post<void>(
          `${URLGame}/${idNewGame}/players`,
          bodyPlayers,
          optionsAddPlayersToGame
        ).subscribe(
          res => console.log(res),
          error => console.log(error.message),
          () => this.router.navigate(['/games'])
        );
      }
    );


  }


  refreshAuthToken() {
    this.authToken = sessionStorage.getItem("TARROTLOG");
  }


}



interface GetResponseGame {
  _embedded:{
    games: Game[];
  },
}


interface GetResponseUser {
  _embedded:{
    users: User[];
  },
}

