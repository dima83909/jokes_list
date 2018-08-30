import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PictureComponent } from '../../com/modal/picture/picture.component';
import { InfoComponent } from '../../com/pop/info/info.component';
import { MongoService, ModalService, SpinnerService } from 'wacom';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  constructor(public us: UserService,
  			public modal: ModalService,
        public spin: SpinnerService,
        private mongo: MongoService) { }

	picture(){
		this.modal.open(PictureComponent);
	}

  ngOnInit() {
      let id = this.spin.open();
      setTimeout( () => {
        this.spin.close(id);
    }, 1000);
  }
}
