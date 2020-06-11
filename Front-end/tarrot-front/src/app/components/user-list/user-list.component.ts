import { Component, OnInit } from '@angular/core';
import {User} from '../../common/user';
import {UserService} from '../../services/user.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.listUsers();
  }

  private listUsers() {
    this.userService.getUserList().subscribe(
      data => this.users = data._embedded.users
    );
  }



  // TO DO
  addToFriend() {

  }
}
