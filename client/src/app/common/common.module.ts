import { NgModule } from '@angular/core';
import { CommonModule as Common } from '@angular/common';
import { NgxIziToastModule } from 'ngx-izitoast';
import { FormsModule } from '@angular/forms';
import { WacomModule } from 'wacom';
@NgModule({
	declarations: [],
	exports: [/* filters */
		NgxIziToastModule,
		FormsModule,
		WacomModule,
		Common
	],
	imports: [
		NgxIziToastModule,
		FormsModule,
		WacomModule,
		Common
	]
})
export class CommonModule { }
