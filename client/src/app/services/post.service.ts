import { Injectable } from '@angular/core';
import { MongoService } from 'wacom';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
	create(post){
		this.mongo.create('post', {
			text: post.text,
			photos: post.photos
			_id: post._id
		});
	}
	delete(post){
		this.mongo.delete('post', {
			_id: post._id
		});
	}
 	constructor(private mongo: MongoService, 
		private http: HttpClient,
	  	public us:UserService) {
		this.posts = mongo.get('post')
	}
}
