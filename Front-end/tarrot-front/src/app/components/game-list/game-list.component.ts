import { Component, OnInit } from '@angular/core';
import {Game} from '../../common/game';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  games: Game[] = [];

  constructor(private gameService : GameService) {

  }

  ngOnInit() {
    this.listGames();
  }

  // Get all games from DB and assign it to this.games
  // Callback: get users[] of each game and assign it to the corresponding game object
  private listGames() {
    this.gameService.getGameList().subscribe(
      data => {
        this.games = data._embedded.games;
      },
      error => {console.log(error.message);},
      () => {this.listGamePlayersInfo()}
    );

  }

  // Get users[] of each game and assign it to the corresponding game object
  private listGamePlayersInfo(){
    for(let game of this.games){
      this.gameService.getGameInfoPlayers(game).subscribe(
        data => {
          game.users = data._embedded.users;
        },
        error => {console.log(error.message);},
      )
    }
  }

  addPlayerToGame() {
    //TODO
  }
}
