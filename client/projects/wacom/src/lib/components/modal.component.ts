import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'modal',
  template: `
    <p>
      <ng-content></ng-content>
    </p>
  `,
  styles: []
})
export class ModalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
