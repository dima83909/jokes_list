import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MetaModule, MetaGuard, MetaConfig } from 'ng2-meta';
import { NgxIziToastModule } from 'ngx-izitoast';
import { GuestComponent } from './common/guest/guest.component';
import { Authenticated, Guest } from '@services';
const metaConfig: MetaConfig = {
	useTitleSuffix: true,
	defaults: {
		title: 'Web Art Work',
		titleSuffix: ' | Web Art Work',
		'og:image': 'https://webart.work/api/user/cdn/waw-logo.png'
	}
};
const routes: Routes = [{
	path: '', redirectTo: 'Login', pathMatch: 'full'
}, {
	path: '',
	canActivate: [Guest],
	component: GuestComponent,
	children: [{
		path: 'login',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Login'
			}
		},
		loadChildren: () => import('./pages/guest/login/login.module').then(m => m.LoginModule)
	}, {
		path: 'sign',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Sign Up'
			}
		},
		loadChildren: () => import('./pages/guest/sign/sign.module').then(m => m.SignModule)
	}, {
		path: 'reset',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Reset Password'
			}
		},
		loadChildren: () => import('./pages/guest/reset/reset.module').then(m => m.ResetModule)
	}, {
		path: 'save',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'New Password'
			}
		},
		loadChildren: () => import('./pages/guest/save/save.module').then(m => m.SaveModule)
	}]
}, {
	path: '**', redirectTo: 'Login', pathMatch: 'full'
}];

@NgModule({
	declarations: [
		AppComponent,
		GuestComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled'
		}),
		MetaModule.forRoot(metaConfig),
		NgxIziToastModule,
		HttpClientModule
	],
	providers: [Authenticated, Guest],
	bootstrap: [AppComponent]
})
export class AppModule { }
