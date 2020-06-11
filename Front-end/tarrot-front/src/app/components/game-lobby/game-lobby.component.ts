import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../common/user';
import {GameService} from '../../services/game.service';

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
  styleUrls: ['./game-lobby.component.css']
})
export class GameLobbyComponent implements OnInit {

  users: User[] = [];

  players: User[] = []
  private snackBar: any;


  constructor(private userService: UserService,
              private gameService: GameService) { }

  ngOnInit() {
    this.handleListUserRequest();
  }

  handleListUserRequest(){
    this.listUsers();
  }


  listUsers() {
    this.userService.getUserList().subscribe(
      data => {this.users = data._embedded.users;},
      error => console.log(error.message)
    );
  }

  addToGame(userId: number) {
    if(this.players.length <5) {
      let tempPlayer: User = this.users.find(tempUser => tempUser.id == userId);
      if (!this.players.find(playerInArray => playerInArray == tempPlayer)) {
        this.players.push(tempPlayer);
      }
    } else {
      window.alert("The game is full");
    }
  }

  launchGame() {
    console.log(">>> Launching the game with players : ");
    for (let i = 0; i < this.players.length; i++) {
      console.log(`Player ${i + 1}: ${this.players[i].nickName}`);
    }

    this.gameService.launchGame(this.players);

  }

  removePlayer(user: User) {
    this.players.splice(this.players.indexOf(user),1);
  }
}
