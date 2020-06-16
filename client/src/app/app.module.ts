import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MetaModule, MetaGuard, MetaConfig } from 'ng2-meta';
import { NgxIziToastModule } from 'ngx-izitoast';
import { Authenticated, Guest, Admins } from '@services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WacomModule } from 'wacom';
// Common
import { AppComponent } from './app.component';
import { GuestComponent } from './common/guest/guest.component';
import { UserComponent } from './common/user/user.component';
// Pages
import { UsersComponent } from './pages/admin/users/users.component';
import { ProfileComponent } from './pages/user/profile/profile.component';
import { LoginComponent } from './pages/guest/login/login.component';
import { ResetComponent } from './pages/guest/reset/reset.component';
import { SaveComponent } from './pages/guest/save/save.component';
import { SignComponent } from './pages/guest/sign/sign.component';
// config
const metaConfig: MetaConfig = {
	useTitleSuffix: true,
	defaults: {
		title: 'Web Art Work',
		titleSuffix: ' | Web Art Work',
		'og:image': 'https://webart.work/api/user/cdn/waw-logo.png'
	}
};
const routes: Routes = [{
	path: '', redirectTo: 'profile', pathMatch: 'full'
}, {
	path: '',
	canActivate: [Authenticated],
	component: UserComponent,
	children: [{
		path: 'profile',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'My Profile'
			}
		},
		component: ProfileComponent
	}]
}, {
	path: '',
	canActivate: [Admins],
	component: UserComponent,
	children: [{
		path: 'users',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Users'
			}
		},
		component: UsersComponent
	}]
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
		component: LoginComponent
	}, {
		path: 'sign',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Sign Up'
			}
		},
		component: SignComponent
	}, {
		path: 'reset',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'Reset Password'
			}
		},
		component: ResetComponent
	}, {
		path: 'save',
		canActivate: [MetaGuard],
		data: {
			meta: {
				title: 'New Password'
			}
		},
		component: SaveComponent
	}]
}, {
	path: '**', redirectTo: 'profile', pathMatch: 'full'
}];

@NgModule({
	declarations: [
		AppComponent,
		GuestComponent,
		UserComponent,
		UsersComponent,
		ProfileComponent,
		LoginComponent,
		ResetComponent,
		SaveComponent,
		SignComponent
	],
	imports: [
		WacomModule,
		CommonModule,
		FormsModule,
		BrowserModule,
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled'
		}),
		MetaModule.forRoot(metaConfig),
		NgxIziToastModule,
		HttpClientModule
	],
	providers: [Authenticated, Guest, Admins],
	bootstrap: [AppComponent]
})
export class AppModule { }
