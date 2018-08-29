import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'pop',
  inputs: ['config'],
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
	public config;
  public show = false;
  public left = -5000;
  public top= -5000;
  public width;

  @ViewChild('pops') pops;

  open(event){
    if(!this.pops||!this.pops.nativeElement.offsetWidth){
        return setTimeout(()=>{
        this.open(event);
      }, 50); 
    }

    switch(this.config.pos){
      case 'rt':
        this.left = event.clientX-event.offsetX + event.target.offsetWidth;
        this.top = event.clientY-event.offsetY - (event.target.offsetHeight*2);
        break;
      case 'r':
        this.left = event.clientX-event.offsetX + event.target.offsetWidth;
        this.top = event.clientY-event.offsetY - (event.target.offsetHeight/2);
        break;
      case 'rb':
        this.left = event.clientX-event.offsetX + event.target.offsetWidth;
        this.top = event.clientY-event.offsetY + event.target.offsetHeight;
        break;
      case 'b':
        this.left = event.clientX-event.offsetX + (event.target.offsetWidth/2) - (this.pops.nativeElement.offsetWidth/2);
        this.top = event.clientY-event.offsetY + event.target.offsetHeight;
        break;
      case 'lb':
        this.left = event.clientX-event.offsetX - this.pops.nativeElement.offsetWidth;
        this.top = event.clientY-event.offsetY + event.target.offsetHeight;
        break;
      case 'l':
        this.left = event.clientX-event.offsetX - this.pops.nativeElement.offsetWidth;
        this.top = event.clientY-event.offsetY - (event.target.offsetHeight/2);
        break;
      case 'lt':
        this.left = event.clientX-event.offsetX - this.pops.nativeElement.offsetWidth;
        this.top = event.clientY-event.offsetY - (event.target.offsetHeight*2);
        break;
      case 't':
        this.left = event.clientX-event.offsetX + (event.target.offsetWidth/2) - (this.pops.nativeElement.offsetWidth/2);
        this.top = event.clientY-event.offsetY - this.pops.nativeElement.offsetHeight;
        break;
      default:
        return this.default(event);
    }
	}

  default(event){

    let top = event.clientY-event.offsetY>this.pops.nativeElement.offsetHeight;
    
    let left = event.clientX-event.offsetX>this.pops.nativeElement.offsetWidth;
    
    let botton = document.documentElement.clientHeight-((event.clientX-event.offsetX)+this.pops.nativeElement.offsetHeight)>this.pops.nativeElement.offsetHeight;
    
    let right = document.documentElement.clientWidth-((event.clientX-event.offsetX)+this.pops.nativeElement.offsetWidth)>this.pops.nativeElement.offsetWidth;


    
    console.log(top);
    console.log(left);
    console.log(botton);
    console.log(right);


    if(left&&top){
      this.config.pos = 'lt';
    } else if(right&&top) {
      this.config.pos = 'rt';
    } else if(right&&botton) {
      this.config.pos = 'rb';
    } else if(left&&botton) {
      this.config.pos = 'lb';
    } else if(top) {
      this.config.pos = 't';
    } else if(right) {
      this.config.pos = 'r';
    }else if(botton) {
      this.config.pos = 'b';
    }else if(left) {
      this.config.pos = 'l';
    } else this.config.pos = 'b';
    this.open(event);
  }

  constructor(public pop: PopupService) { }
  
  ngOnInit() {
  }
}
