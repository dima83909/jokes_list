import { Injectable } from '@angular/core';
import {MongoService} from 'wacom';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class UserService {
	public users;
	public avatarUrl = "/api/user/default.png";
	update() {
		this.mongo.updateAll('user', this, {
			fields: 'name birth skills data'
		});
	}
	constructor(private mongo: MongoService, http: HttpClient) {
		this.users = mongo.get('user');
		console.log(this.users);
		http.get('/api/user/me').subscribe(resp => {
			for (var key in resp) {
				this[key] = resp[key];
			}
		});
	}
}