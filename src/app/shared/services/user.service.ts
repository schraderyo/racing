import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

const TOKEN = "TOKEN";

@Injectable({ providedIn: "root" })
export class UserService {
  username: string;

  constructor(private http: HttpClient) {}

  /**
   * Set mock token to login the user
   * @param token
   */
  login(token: string): void {
    localStorage.setItem(TOKEN, token);
  }

  /**
   * Validate the user as logged in if token exists to bypass gaurd
   */
  isLogged() {
    return localStorage.getItem(TOKEN) != null;
  }

  /**
   * Remove login token from local storage
   */
  logout() {
    localStorage.removeItem(TOKEN);
  }

  /**
   * Set the username of logged in user
   * @param name
   */
  setUsername(name: string): void {
    this.username = name;
  }
}
