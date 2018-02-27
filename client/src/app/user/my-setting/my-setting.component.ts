import { Component, OnInit } from '@angular/core';

import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-my-setting',
  templateUrl: './my-setting.component.html',
  styleUrls: ['./my-setting.component.css']
})
export class MySettingComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.test()
  }

  // Test message. Remove it
  test() {
    const testMessage = `${this.userService.testMessage()} to MySettingComponent`
    console.log(testMessage)
  }

}
