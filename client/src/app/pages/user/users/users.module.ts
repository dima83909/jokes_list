import { UsersComponent } from './users.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PipesModule } from '@pipes';
const routes: Routes = [{
    path: '',
    component: UsersComponent
}];

@NgModule({
  imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        PipesModule
    ],
    declarations: [
        UsersComponent
    ],
    providers: []
})
export class UsersModule { }
