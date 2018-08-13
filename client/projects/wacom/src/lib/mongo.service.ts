import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class MongoService {
	replace(doc, value, rpl){
		if(value.indexOf('.')>-1){
			value = value.split('.');
			let sub = value.shift();
			if(doc[sub] && (typeof doc[sub] != 'object' || Array.isArray(doc[sub])))
				return;
			if(!doc[sub]) doc[sub] = {};
			return this.replace(doc[sub], value.join('.'), rpl);
		}
		if(typeof rpl == 'function'){
			rpl(doc[value], function(newValue){
				doc[value] = newValue;
			}, doc);
		}
	};
	push(part, doc){
		if(this.data['opts'+part].replace){
			for(let key in this.data['opts'+part].replace){
				this.replace(doc, key, this.data['opts'+part].replace[key]);
			}
		}
		this.data['arr' + part].push(doc);
		this.data['obj' + part][doc._id] = doc;
		console.log(this.data['opts'+part]);
	}
	create(part, obj=null, cb=null) {
		if (typeof obj == 'function') {
			cb = obj;
			obj = {};
		}
		this.http.post < any > ('/api/' + part + '/create', obj || {})
			.subscribe(resp => {
				if (resp) {
					this.push(part,resp);
					if (typeof cb == 'function') cb(resp);
				}else if (typeof cb == 'function') {
					cb(false);
				}
			}, err => {

			})
	};
	private data = {};
	get(part, opts=null, cb=null) {
		if (typeof opts == 'function') {
			cb = opts;
			opts = {};
		}
		this.data['arr' + part] = [];
		this.data['obj' + part] = {};
		this.data['opts' + part] = opts||{};
		this.http.get < any > ('/api/' + part + '/get')
			.subscribe(resp => {
				if (resp) {
					for (let i = 0; i < resp.length; i++) {
						this.push(part,resp[i]);
					}
					if (typeof cb == 'function') cb(this.data['arr' + part], this.data['obj' + part]);
				} else if (typeof cb == 'function') {
					cb(false);
				}
				console.log(resp);
			}, err => {

			})
		return this.data['arr' + part];
	};
	updateAll(part, doc, opts=null, cb=null) {
		if (typeof opts == 'function'){
			cb = opts;
			opts = {};
		}
		if(typeof opts != 'object') opts = {};
		if(opts.fields){
			if(typeof opts.fields == 'string') opts.fields = opts.fields.split(' ');
			let _doc = {};
			for(let i = 0; i < opts.fields.length; i++){
				_doc[opts.fields[i]] = doc[opts.fields[i]];
			}
			doc = _doc;
		}
		this.http.post('/api/' + part + '/update/all' + (opts.name||''), doc).subscribe(resp => {
			if (resp && typeof cb == 'function') {
				cb(resp);
			} else if (typeof cb == 'function') {
				cb(false);
			}
		});
	};
	delete(part, doc, opts=null, cb=null) {
		if (!opts) opts = '';
		if (!doc) return;
		if (typeof opts == 'function') {
			cb = opts;
			opts = '';
		}
		this.http.post('/api/' + part + '/delete' + opts, doc).subscribe(resp => {
			if (resp && Array.isArray(this.data['arr' + part])) {
				for (var i = 0; i < this.data['arr' + part].length; i++) {
					if (this.data['arr' + part][i]._id == doc._id) {
						this.data['arr' + part].splice(i, 1);
						break;
					}
				}
				delete this.data['obj' + part][doc._id];
			}
			if (resp && typeof cb == 'function') {
				cb(resp);
			} else if (typeof cb == 'function') {
				cb(false);
			}
		});
	};
	beArr(val, cb){
		if(!Array.isArray(val)) cb([]);
		else cb(val);
	};
	beObj(val, cb){
		if(typeof val != 'object' || Array.isArray(val)){
			val = {};
		}
		cb(val);
	}

	constructor(private http: HttpClient) {}
}