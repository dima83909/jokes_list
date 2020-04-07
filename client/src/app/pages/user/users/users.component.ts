import { Component } from '@angular/core';
import { UserService } from '@services';

@Component({
	selector: 'app-users',
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss']
})
export class UsersComponent{
	public role:any='';
	public newrole:any='';
	constructor(public us: UserService) { }
}
