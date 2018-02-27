import { Component, OnInit } from '@angular/core';

import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.test()
  }

  // Test message. Remove it
  test() {
    const testMessage = `${this.userService.testMessage()} to ProfileComponent`
    console.log(testMessage)
  }

}
