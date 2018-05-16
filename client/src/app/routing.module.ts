import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';


import { ExploreComponent } from './user/explore/explore.component';
import { MyProfileComponent } from './user/my-profile/my-profile.component';
import { MySettingsComponent } from './user/my-settings/my-settings.component';
import { ProfileComponent } from './user/profile/profile.component';

const app_routing: Routes = [{
  path: '',
  component: ExploreComponent
}, {
  path: 'myProfile',
  component: MyProfileComponent
}, {
  path: 'mySettings',
  component: MySettingsComponent
}, {
  path: 'profile',
  component: ProfileComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(app_routing)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }
