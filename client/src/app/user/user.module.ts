import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore/explore.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MySettingsComponent } from './my-settings/my-settings.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ExploreComponent, MyProfileComponent, MySettingsComponent, ProfileComponent]
})
export class UserModule { }
