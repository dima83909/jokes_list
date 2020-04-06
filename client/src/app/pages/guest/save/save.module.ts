import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveComponent } from './save.component';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{
	path: '',
	component: SaveComponent
}];

@NgModule({
	declarations: [SaveComponent],
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		FormsModule
	]
})
export class SaveModule { }
