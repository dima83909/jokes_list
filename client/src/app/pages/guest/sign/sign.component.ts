import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '@services';
@Component({
	selector: 'app-sign',
	templateUrl: './sign.component.html',
	styleUrls: ['./sign.component.scss']
})
export class SignComponent {
	constructor(private router: Router,
		public us: UserService,
		private http: HttpClient,) {
	}
	public joke:any = {};
	ngOnInit(){
		this.http.get < any > ('http://api.icndb.com/jokes/'+this.router.url.split('/').pop(), {}).subscribe(resp=>{
			this.joke = resp.value;
		}, resp=>{});
	}
}