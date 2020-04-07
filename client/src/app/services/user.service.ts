import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MongoService } from 'wacom';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})

export class UserService {
	/*
	*	Declarations
	*/
		public users: any = [];
		public _users: any = {};
		public data: any = {};
		public avatarUrl: any;
		public name: any;
		public email: any;
	/*
	*	Code
	*/
	constructor(private mongo: MongoService,
		private router: Router,
		private http: HttpClient) {
		/*
		mongo.fetch('user', {
			replace: {
				data: (field, cb, doc) => {
					if(typeof field != 'object') field = {};
					if(typeof field.request!='object')  field.request = {};
					if(typeof field.reason !='object')  field.reason = {};
					cb(field);
				},
				is: mongo.beObj
			}
		}, me => {
			for (var key in me) {
				this[key] = me[key];
			}
			this.users = mongo.get('user', (arr, obj) => {
				this._users = obj;
			});
		});
		*/
		http.get('/api/user/me').subscribe((resp:any) => {
			if(typeof resp.data != 'object') resp.data = {};
			if(typeof resp.is != 'object') resp.is = {};
			if(typeof resp.data.request != 'object') resp.data.request = {};
			if(typeof resp.data.reason != 'object') resp.data.reason = {};
			for (var key in resp) {
				this[key] = resp[key];
			}
			this.users = mongo.get('user', {
				replace: {
					data: (field, cb, doc) => {
						if(typeof field != 'object') field = {};
						if(typeof field.request!='object')  field.request = {};
						if(typeof field.reason !='object')  field.reason = {};
						cb(field);
					},
					is: mongo.beObj
				}
			}, (arr, obj) => {
				this._users = obj;
			});
		});
	}
	update(){
		this.mongo.afterWhile(this, ()=>{
			this.mongo.update('user', this, {
				fields: 'name data avatarUrl'
			});
		});
	}
	save(user){
		this.mongo.afterWhile(this, ()=>{
			this.mongo.updateAll('user', user, {
				name: 'admin'
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
	remove_role(role){
		this.mongo.updateAll('user', {
			remove: role,
			data: this.data,
			name: this.name
		});
	}
	todataUrl(fl, cb) {
        var a = new FileReader();
        a.onload = (e)=>{
            var target: any = e.target;
            cb(target.result);
        }
        a.readAsDataURL(fl);
    }
    changeAvatar(e){
		this.todataUrl(e.target.files[0], (dataUrl)=>{
			this.avatarUrl = dataUrl;
			this.http.post('/api/user/avatar', {
				dataUrl: dataUrl
			}).subscribe((resp:any)=> {
				console.log(resp);
				this.avatarUrl = resp;
			});
		});
	}
	logout(){
		localStorage.removeItem('waw_user')
		this.http.get('/api/user/logout-local').subscribe((resp:any)=> {});
		this.router.navigate(['/login']);
	}
}