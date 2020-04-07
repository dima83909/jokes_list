import { ProfileComponent } from './profile.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PipesModule } from '@pipes';

const routes: Routes = [{
	path: '',
	component: ProfileComponent
}];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		CommonModule,
		FormsModule,
		PipesModule
	],
	declarations: [
		ProfileComponent
	],
	providers: []
})
export class ProfileModule { }