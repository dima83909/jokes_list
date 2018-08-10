import { Injectable } from '@angular/core';
import {MongoService} from 'wacom';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public users;

  constructor(private mongo: MongoService) {
    console.log('testing service');

    this.users=mongo.get('user');
    console.log(this.users);
    
  }
}
