import {UserAddress} from './user-address';

export class User {
   id: number;
   email: string;
   firstName: string;
   lastName: string;
   nickName: string;
   password: string;
   address: UserAddress;
}
