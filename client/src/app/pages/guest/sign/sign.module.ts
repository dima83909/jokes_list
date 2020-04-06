import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignComponent } from './sign.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{
	path: '',
	component: SignComponent
}];

@NgModule({
	declarations: [SignComponent],
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		FormsModule
	]
})
export class SignModule { }
