import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SearchPipe } from './pipes/search.pipe';
import { PictureComponent } from './com/modal/picture/picture.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [{
  path: '',
  component: ExploreComponent
}, {
  path: 'Profile',
  component: ProfileComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    ProfileComponent,
    PictureComponent,
    ExploreComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
