import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "src/app/shared/services/user.service";

const TOKEN = "TOKEN";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  /**
   * Instantiate login form
   */
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
  }

  /**
   * Login to the site. Save username in local storage and call user
   * service to create a mock logged in state for Login gaurd
   */
  login() {
    localStorage.setItem("username", this.loginForm.value.username);
    this.userService.setUsername(this.loginForm.value.username);
    this.userService.login(TOKEN);
    this.router.navigate(["/members"]);
  }
}
