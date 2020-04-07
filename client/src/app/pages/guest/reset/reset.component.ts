import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxIzitoastService } from 'ngx-izitoast';
import { Router } from '@angular/router';

@Component({
	selector: 'app-reset',
	templateUrl: './reset.component.html',
	styleUrls: ['./reset.component.scss']
})
export class ResetComponent {
	constructor(private router: Router,
		private http: HttpClient,
		private alert: NgxIzitoastService) {}
	public user:any = {
		email: 'ceo@webart.work',
		password: 'asdasdasdasd'
	};
	reset() {
		if(!this.user.email) {
			this.alert.error({
				title: 'Enter your email',
			})
			return;
		}
		this.http.post('/api/user/status', this.user).subscribe((resp:any) => {
			if(resp.email) {
				localStorage.setItem('waw_reset_email', this.user.email);
				this.router.navigate(['/save']);
				this.http.post('/api/user/request', {
					email: this.user.email
				}).subscribe((resp:any) => {})
				this.alert.info({
					title: "Mail will sent to your email"
				})
			} else {
				this.alert.error({
					title: "This email not used"
				})
			}
		})
	}
}