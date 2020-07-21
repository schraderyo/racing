import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/app.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.css"],
})
export class MembersComponent implements OnInit {
  members = [];

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit() {
    this.loadMembers();
  }

  /**
   *  Get all current members of the organization
   */
  loadMembers() {
    this.appService
      .getMembers()
      .subscribe((members) => (this.members = members));
  }

  /**
   * Route to memberDetails url
   */
  goToAddMemberForm() {
    this.router.navigate(["memberDetails"]);
  }

  /**
   * @param id - id of member
   * Route to memberDetails url with appropriate ID of 
   * org member being edited
   */
  editMemberByID(id: number) {
    this.router.navigate(["memberDetails", { data: id }]);
  }

  /**
   * @param id - id of member 
   * Call a confirmation popup. On confirmation, call delete member service call
   */
  deleteMemberById(id: number) {
    if (confirm("Are you sure you want to delete this member?")) {
      this.deleteMemberByIdConfirm(id);
    }
  }

  deleteMemberByIdConfirm(id: number) {
    this.appService.deleteMember(id).subscribe((res) => {
      this.loadMembers();
    });
  }
}
