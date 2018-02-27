import { Component, OnInit } from '@angular/core';

import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  constructor(
   private userService: UserService
  ) { }

  ngOnInit() {
    this.test()
  }

  // Test message. Remove it
  test() {
    const testMessage = `${this.userService.testMessage()} to ExploreComponent`
    console.log(testMessage)
  }
}
