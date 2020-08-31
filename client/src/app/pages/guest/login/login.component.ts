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
	search(given: any, s?:any, f?:any, l?:any, i?:any, reload?:any){
		// given stands for the provided array with docs
		// s stands for search
		// f stands for fields
		// l stands for limit
		// i stands for ignore filter
		// start stands for start the limit
		if(!s){
			return given;
		}
		if(typeof f == 'number'){
			l = f;
			f = null;
		}
		if(i || !s){
			if(l && Array.isArray(given)) return given.slice(0, l);
			else return given||[];
		}
		let _arr = [], _check = {};
		if(!Array.isArray(s)&&typeof s == 'object'){
			let _s = [];
			for(let key in s){
				if(s[key]) _s.push(key);
			}
			s = _s;
		}
		if(typeof s == 'string'){
			s = [s];
		}
		if(!f) f = ['name'];
		if(typeof f == 'string') f = f.split(' ');
		let sub_test = function(obj, _f, initObj, check){
			if(!obj) return;
			if(_f.indexOf('.')>-1){
				let sub = _f.split('.');
				let nsub = sub.shift();
				if(Array.isArray(obj[nsub])){
					for(let s = 0; s < obj[nsub].length; s++){
						sub_test(obj[nsub][s], sub.join('.'), initObj, check);
					}
					return;
				}else{
					return sub_test(obj[nsub], sub.join('.'), initObj, check);
				}
			}
			for (let j = 0; j < s.length; j++) {
				let b = false;
				if((typeof obj[_f] == 'string' || typeof obj[_f] == 'number') && typeof s[j] == 'string' &&
					(obj[_f].toString().toLowerCase().indexOf(s[j].toLowerCase())>-1 ||
					 s[j].toLowerCase().indexOf(obj[_f].toString().toLowerCase())>-1)){
					if(!_check[check]) _arr.push(initObj);
					_check[check] = true;
					b = true;
					break;
				}
				if(b) break;
			}
		}
		let test = function(obj, check) {
			for (let i = 0; i < f.length; i++) {
				sub_test(obj, f[i], obj, check);
			}
		}
		if (Array.isArray(given)) {
			for (let i = 0; i < given.length; i++) {
				test(given[i], i);
			}
		} else if (typeof given == 'object') {
			for (let key in given) {
				test(given[key], key);
			}
		}
		if(l) return _arr.splice(0, l);
		return _arr;
	}
}