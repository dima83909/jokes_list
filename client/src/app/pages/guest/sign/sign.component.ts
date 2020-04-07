import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxIzitoastService } from 'ngx-izitoast';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sign',
	templateUrl: './sign.component.html',
	styleUrls: ['./sign.component.scss']
})
export class SignComponent {
	constructor(private router: Router,
		private http: HttpClient,
		private alert: NgxIzitoastService) {}
	public user:any = {
		email: 'ceo@webart.work',
		password: 'asdasdasdasd'
	};
	sign() {
		if(!this.user.email) {
			this.alert.error({
				title: 'Enter your email',
			})
			return;
		}
		if(!this.user.password) {
			this.alert.error({
				title: 'Enter your password',
			})
			return;
		}
		this.http.post('/api/user/status', this.user).subscribe((resp:any) => {
			if(resp.email) {
				this.alert.error({
					title: "This email already exists",
				})
			} else {
				this.http.post('/api/user/signup-local', {
					username: this.user.email,
					password: this.user.password
				}).subscribe((res:any) => {
					localStorage.setItem('waw_user', JSON.stringify(res));
					this.router.navigate(['/profile'])
				})
			}
		})
	}
}