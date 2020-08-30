import { Component } from '@angular/core';
import { NgxIzitoastService } from 'ngx-izitoast';
import { Router } from '@angular/router';
import { HashService, HttpService } from 'wacom';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	constructor(private router: Router,
		private hash: HashService,
		private http: HttpService,
		private alert: NgxIzitoastService) {
		this.user.email = this.hash.get('email')||'ceo@webart.work';
		this.user.password = this.hash.get('password')||'asdasdasdasd';
		if(this.hash.get('login')) this.login();
	}
	public user:any = {};
	login() {
		if(!this.user.email) {
			return this.alert.error({
				title: 'Enter your email',
			});			
		}
		this.hash.set('email', this.user.email);
		if(!this.user.password) {
			return this.alert.error({
				title: 'Enter your password',
			});
		}
		this.http.post('/api/user/status', this.user, (resp:any) => {
			if(resp.email && resp.pass) {
				this.http.post('/api/user/login', this.user, (user:any) => {
					if(!user){
						return this.alert.error({
							title: "Something went wrong",
						});
					}
					localStorage.setItem('waw_user', JSON.stringify(user));
					this.router.navigate(['/profile'])
				})
			} else {
				this.alert.error({
					title: "Wrong email or password",
				});
			}
		})
	}
}