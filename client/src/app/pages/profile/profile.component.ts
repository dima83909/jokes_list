import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PictureComponent } from '../../com/modal/picture/picture.component';
import { ModalService } from 'wacom';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public us: UserService,
  			public modal: ModalService) { }

	picture(){
		this.modal.open(PictureComponent);
	}

  ngOnInit() {
  }

}
