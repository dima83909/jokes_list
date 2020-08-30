import { Component } from '@angular/core';
import { NgxIzitoastService } from 'ngx-izitoast';
import { Router } from '@angular/router';
import { HttpService } from 'wacom';

@Component({
	selector: 'app-save',
	templateUrl: './save.component.html',
	styleUrls: ['./save.component.scss']
})
export class SaveComponent {
	constructor(private router: Router,
		private http: HttpService,
		private alert: NgxIzitoastService) {
		if(localStorage.getItem('waw_reset_email')){
			this.user.email = localStorage.getItem('waw_reset_email');
		}
		if(!this.user.email){
			this.router.navigate(['/reset']);
		}
	}
	public user:any = {};
	changePass() {
		if(!this.user.code) {
			return this.alert.error({
				title: 'Enter your code'
			});
		}
		if(!this.user.password) {
			return this.alert.error({
				title: 'Enter your password',
			});
		}
		this.http.post('/api/user/change', this.user, (resp:any) => {
			this.alert.info({
				title: resp
			});
			this.http.post('/api/user/login', this.user, (user:any) => {
				if(!user){
					return this.alert.error({
						title: "Something went wrong",
					});
				}
				localStorage.setItem('waw_user', JSON.stringify(user));
				this.router.navigate(['/profile']);
			});			
		});
	}
}