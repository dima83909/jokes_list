import { Injectable } from '@angular/core';
import {MongoService} from 'wacom';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  public users;
  public avatarUrl = "/api/user/default.png";
  update(){
    this.mongo.updateAll('user',{
      gender: this.gender,
      name: this.name,
      birth: this.birth,
      skills: this.skills,
      data: this.data
    });
  }

  constructor(private mongo: MongoService, http: HttpClient) {
    var self = this;
    this.users=mongo.get('user');
    console.log(this.users); 
    http.get('/api/user/me').subscribe(resp => {
      for(var key in resp){
        self[key]=resp[key];
      }
    });
  
  }
}
