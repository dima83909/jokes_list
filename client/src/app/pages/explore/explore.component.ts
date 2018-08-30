import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PictureComponent } from '../../com/modal/picture/picture.component';
import { InfoComponent } from '../../com/pop/info/info.component';
import { MongoService, ModalService, SpinnerService, PopupComponent } from 'wacom';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
	public post = {};

	  public config = {
    html: 'dfhfgh',
    pos: 'lt'
  }
  constructor(public ps: PostService) { }
  ngOnInit() {
  }
}
