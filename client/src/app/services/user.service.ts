import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MongoService } from 'wacom';

export interface User {
	name: string;
	_id: string;
}

@Injectable({
	providedIn: 'root'
})

export class UserService implements User {
	/*
	*	Declarations
	*/
		// List of users
		public users: User[];
		// My User Info
		public name;
		public _id;
	/*
	*	Code
	*/
	constructor(private mongo: MongoService, 
		private http: HttpClient) {
		http.get('/api/user/me').subscribe(resp => {
			for (var key in resp) {
				this[key] = resp[key];
			}
			this.users = mongo.get('user');
		});
	}
	update(){
		this.mongo.afterWhile(this, ()=>{
			this.mongo.updateAll('user', this, {
				fields: '_id name'
			});
		});
	}
	change_password(oldPass, newPass){
		this.http.post('/api/user/changePassword', {
			newPass: newPass,
			oldPass: oldPass
		}).subscribe(resp => {
			if(resp) alert('successfully changed password');
			else alert('failed to change password');
		});	
	}
}