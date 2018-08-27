import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PictureComponent } from '../../com/modal/picture/picture.component';
import { MongoService, ModalService, SpinnerService, PopupService } from 'wacom';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public config ={
    html: 'hello'
  }
  constructor(public us: UserService,
  			public modal: ModalService,
        public spin: SpinnerService,
        public pop: PopupService,
        private mongo: MongoService) { }

	picture(){
		this.modal.open(PictureComponent);
	}


  ngOnInit() {
      let id = this.spin.open();
      setTimeout( () => {
        this.spin.close(id);
    }, 2000);
  }
}
