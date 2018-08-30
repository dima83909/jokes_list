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
  public left = 50;
  public top= 50;

  @ViewChild('pops') pops;

  open(event){
    this.show = true;
    if(!this.pops||!this.pops.nativeElement.offsetWidth){
        return setTimeout(()=>{
          console.log(this.pops);
          this.pop.open(event, this.pops, this.config, this.left, this.top);
      }, 500); 
    }
  }

  constructor(private pop: PopupService) { }
  
  ngOnInit() {
  }
}
