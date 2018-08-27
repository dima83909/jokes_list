import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../services/popup.service'
@Component({
  selector: 'pop',
  inputs: ['config'],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
	private id;
	public config;
	public show = false;
	open(event){
		console.log(event);
	}
  constructor(public pop: PopupService) { }
  
  ngOnInit() {	
  	let obj=this.pop.pull();
  	for(let key in obj){
  		this[key]=obj[key];
  	}
  }
}
