import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '@services';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	constructor(private router: Router,
		public us: UserService,
		private http: HttpClient,) {
	}
	public search_w:string = '';
	public jokes:any = [];
	public start=0;
	public stop=10;
	load_next(){
		if(this.start+10>this.jokes.length) return;
		this.start+=10;
		this.stop+=10;
	}
	load_prev(){
		if(this.start>=10)this.start-=10;
		else this.start=0;
		if(this.stop>=20)this.stop-=10;
		else this.stop=10;
	}
	setMode(){
		console.log(this.us.mode)
		localStorage.setItem("dark_mode", this.us.mode);
	}
	ngOnInit(){
		this.http.get < any > ('http://api.icndb.com/jokes/random/9999', {}).subscribe(resp=>{
			this.jokes = resp.value;
		}, resp=>{});
	}
}