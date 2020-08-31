import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { Authenticated, Guest, Admins } from '@services';
// Common
import { AppComponent } from './app.component';
import { GuestComponent } from './common/guest/guest.component';
import { UserComponent } from './common/user/user.component';
// config
import { WacomModule, MetaGuard, Config } from 'wacom';
const config: Config = {
	socket: {},
	meta: {
		useTitleSuffix: true,
		defaults: {
			title: 'Web Art Work',
			titleSuffix: ' | Web Art Work',
			'og:image': 'https://webart.work/api/user/cdn/waw-logo.png'
		}
	}
};
/*
*	Routing Management
*/
	const routes: Routes = [{
		path: '', redirectTo: 'jokes', pathMatch: 'full'
	}, {
		path: '',
		canActivate: [Guest],
		component: GuestComponent,
		children: [/* guest */{
			path: 'jokes',
			canActivate: [MetaGuard],
			data: {
				meta: {
					title: 'Jokes'
				}
			},
			loadChildren: () => import('./pages/guest/login/login.module').then(m => m.LoginModule)
		}, {
			path: 'joke/:id',
			canActivate: [MetaGuard],
			data: {
				meta: {
					title: 'Joke'
				}
			},
			loadChildren: () => import('./pages/guest/sign/sign.module').then(m => m.SignModule)
		}]
	}];
/* Bootstrap */

@NgModule({
	declarations: [
		AppComponent,
		GuestComponent,
		UserComponent
	],
	imports: [
		BrowserModule,
		WacomModule.forRoot(config),
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			preloadingStrategy: PreloadAllModules
		})
	],
	providers: [Authenticated, Guest, Admins],
	bootstrap: [AppComponent]
})
export class AppModule { }
