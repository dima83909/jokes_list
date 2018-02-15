import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*
*	Routing
*/
import { RouterModule, Routes} from '@angular/router';
import { ExploreComponent } from './user/explore/explore.component';
const app_routing: Routes = [{
	path: 'explore',
	component: ExploreComponent
}];

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ], imports: [
    BrowserModule,
    RouterModule.forRoot(app_routing)
  ], providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
