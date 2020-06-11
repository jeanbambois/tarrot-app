import {User} from './user';

export class Game {
  id: number;
  finished: boolean;
  users: User[];
  _links: {
    "self": {
      "href": string
    },
    "game": {
      "href": string
    },
    "players": {
      "href": string
    }
  }
}
