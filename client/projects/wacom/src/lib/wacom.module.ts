import { NgModule } from '@angular/core';
import { ModalComponent } from './components/modal/modal.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { PopupComponent } from './components/popup/popup.component';
import { CommonModule } from '@angular/common'; 
import { ClickOutsideModule } from 'ng-click-outside';
@NgModule({
  imports: [ 
  	CommonModule,
    ClickOutsideModule
  ],
  declarations: [
  	ModalComponent,
    SpinnerComponent,
    PopupComponent
  ],
  exports: [
  	ModalComponent,
    SpinnerComponent,
    PopupComponent
  ],
  entryComponents:[
    ModalComponent,
    SpinnerComponent,
    PopupComponent
  ]
})
export class WacomModule { }
