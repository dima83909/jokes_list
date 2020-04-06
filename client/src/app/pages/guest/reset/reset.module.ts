import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetComponent } from './reset.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{
	path: '',
	component: ResetComponent
}];

@NgModule({
	declarations: [ResetComponent],
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		FormsModule
	]
})
export class ResetModule { }
