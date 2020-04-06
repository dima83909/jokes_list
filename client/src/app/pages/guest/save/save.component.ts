import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxIzitoastService } from 'ngx-izitoast';
import { Router } from '@angular/router';

@Component({
	selector: 'app-save',
	templateUrl: './save.component.html',
	styleUrls: ['./save.component.scss']
})
export class SaveComponent {
	constructor(private router: Router,
		private http: HttpClient,
		private alert: NgxIzitoastService) {
		if(localStorage.getItem('waw_reset_email')){
			this.user.email = localStorage.getItem('waw_reset_email');
		}
		if(!this.user.email){
			this.router.navigate(['/reset']);
		}
	}
	public user:any = {
		email: 'crackeraki@gmail.com',
		password: 'asdasdasdasd'
	};
	changePass() {
		if(!this.user.code) {
			this.alert.error({
				title: 'Enter your code'
			})
			return;
		}
		if(!this.user.password) {
			this.alert.error({
				title: 'Enter your password',
			})
			return;
		}
		this.http.post('/api/user/change', {
			password: this.user.password,
			email: this.user.email,
			pin: this.user.code
		}).subscribe((resp:any) => {
			this.alert.info({
				title: resp
			});
			this.http.post('/api/user/login-local', {
				password: this.user.password,
				username: this.user.email
			}).subscribe((res:any) => {
				localStorage.setItem('waw_user', JSON.stringify(res));
				this.router.navigate(['/']);
			});			
		});
	}
}