import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";
import { Adapters } from "./app.model";
import { ROUTES } from "./app.constants";

@Injectable({
  providedIn: "root",
})
export class AppService {
  api = ROUTES.API;

  constructor(private http: HttpClient) {}

  /**
   * Returns all members of org
   */
  getMembers() {
    const membersAdapter = new Adapters().MembersAdapter;
    return this.http
      .get(this.api + ROUTES.MEMBERS)
      .pipe(
        map((data: any[]) => membersAdapter(data), catchError(this.handleError))
      );
  }

  /**
   * Reterns a member of the org via ID
   * @param id
   */
  getMemberById(id: number) {
    const memberAdapter = new Adapters().MemberAdapter;
    return this.http
      .get(`${this.api}${ROUTES.MEMBERS}/${id}`)
      .pipe(
        map((data: any) => memberAdapter(data), catchError(this.handleError))
      );
  }

  /**
   * Add member to the org by passing in member details
   * @param memberForm
   */
  addMember(memberForm: any) {
    return this.http
      .post(this.api + ROUTES.ADD_MEMBER, memberForm)
      .pipe(catchError(this.handleError));
  }

  /**
   * Edit member of org by passing in member details and ID
   * @param memberForm
   * @param id
   */
  editMember(memberForm: any, id: number) {
    return this.http
      .put(`${this.api}${ROUTES.EDIT_MEMBER}/${id}`, memberForm)
      .pipe(catchError(this.handleError));
  }

  /**
   * Delete member of org by ID
   * @param id
   */
  deleteMember(id: number) {
    return this.http
      .delete(`${this.api}${ROUTES.DELETE_MEMBER}/${id}`)
      .pipe(catchError(this.handleError));
  }

  /**
   * Get objects to select from the database
   */
  getTeams(): any {
    const teamAdapter = new Adapters().TeamAdapter;
    return this.http
      .get(this.api + ROUTES.TEAMS)
      .pipe(
        map((data: any) => teamAdapter(data), catchError(this.handleError))
      );
  }

  /**
   * Return error message if occurs
   * @param error
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("An error occurred:", error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
