import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchPipe } from './pipes/search.pipe';
import { OtaPipe } from './pipes/ota.pipe';
import { PictureComponent } from './com/modal/picture/picture.component';
import { InfoComponent } from './com/pop/info/info.component';
import { WacomModule } from 'wacom';
import { ExploreComponent } from './pages/explore/explore.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './pages/users/users.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ArchitectComponent } from './admin/architect/architect.component';
import { PostsComponent } from './admin/posts/posts.component';
const routes: Routes = [{
  path: '',
  component: ExploreComponent
}, {
  path: 'Profile',
  component: ProfileComponent
}, {
  path: 'Users',
  component: UsersComponent
}, {
  path: 'Admin/Users',
  component: UsersComponent
}, {
  path: 'Admin/Dashboard',
  component: DashboardComponent
}, {
  path: 'Admin/Architect',
  component: ArchitectComponent
}, {
  path: 'Admin/Posts',
  component: PostsComponent
}];

@NgModule({
  declarations: [
    AppComponent,
    SearchPipe,
    OtaPipe,
    ProfileComponent,
    PictureComponent,
    InfoComponent,
    ExploreComponent,
    UsersComponent,
    DashboardComponent,
    ArchitectComponent,
    PostsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    WacomModule
  ],
  entryComponents:[
    PictureComponent,
    InfoComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
