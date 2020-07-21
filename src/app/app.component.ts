import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'racing';

  constructor(private userService: UserService, private translate: TranslateService) {
    translate.setDefaultLang("en");
  }

  ngOnInit(): void {
    if (!this.userService.username || this.userService.username.length < 1) {
      this.userService.setUsername(localStorage.getItem('username'));
    }
  }
}
