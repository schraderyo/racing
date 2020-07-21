import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "src/app/shared/services/user.service";

@Component({
  selector: "app-banner",
  templateUrl: "./banner.component.html",
  styleUrls: ["./banner.component.css"],
})
export class BannerComponent implements OnInit {
  constructor(
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit() {}

  /**
   * Call userservice to logout of the application and remove TOKEN
   */
  logout() {
    this.userService.username = "";
    localStorage.removeItem("username");
    this.userService.logout();
    this.router.navigate(["/login"]);
  }
}
