import { Injectable } from '@angular/core';
import {
	MongoService,
	ModalService
} from 'wacom';
import { HttpClient } from '@angular/common/http';
import { PictureComponent } from '../com/modal/picture/picture.component';


@Injectable({
  providedIn: 'root'
})

export class UserService {
	public users;
	public avatarUrl = "/api/user/default.png";
	public data = {};
	update(){
		this.mongo.updateAll('user', this, {
			fields: 'name birth skills data'
		});
	}

	picture(){
		this.modal.appendComponentToBody(PictureComponent);
	}

	constructor(private mongo: MongoService, 
		private http: HttpClient,
		private modal: ModalService) {
		this.users = mongo.get('user',{
			replace:{
				'data':mongo.beObj
			}
		});
		console.log(this.users);
		http.get('/api/user/me').subscribe(resp => {
			for (var key in resp) {
				this[key] = resp[key];
			}
		});
	}
}