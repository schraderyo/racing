import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
} from "@angular/forms";
import { AppService } from "src/app/app.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Team, Member } from "src/app/app.model";

@Component({
  selector: "app-member-details",
  templateUrl: "./member-details.component.html",
  styleUrls: ["./member-details.component.css"],
})
export class MemberDetailsComponent implements OnInit {
  alertType: String;
  alertMessage: String;
  memberForm: FormGroup;
  memberId: number;
  memberModel: Member;
  showForm: boolean = false;
  submitted: boolean = false;
  teams: Team[] = [];

  constructor(
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((event) => {
      this.memberId = event.data;
      this.initializeData();
    });
  }

  /**
   * Get Teams for select field and then initialize form before displaying it
   */
  initializeData() {
    this.getTeamsList().subscribe((res) => {
      this.teams = res;
      if (this.memberId) {
        this.getMemberData().subscribe((res) => {
          let memberData = this.setMemberData(res);
          this.initializeForm(memberData);
          this.showForm = true;
        });
      } else {
        let memberData = this.setMemberData();
        this.initializeForm(memberData);
        this.showForm = true;
      }
    });
  }

  /**
   * Initialize the form by setting up validators and setting
   * Form values if editing a form item
   */
  initializeForm(member?) {
    const formControls = new FormGroup({
      firstName: new FormControl(member.firstName, Validators.required),
      lastName: new FormControl(member.lastName, Validators.required),
      jobTitle: new FormControl(member.jobTitle, Validators.required),
      team: new FormControl(this.getTeam(member.team)),
      status: new FormControl(member.status),
    });

    this.memberForm = formControls;
  }

  /**
   * Initialize member template to initialize form with out without data
   * @param member 
   */
  setMemberData(member?) {
    let memberTemplate: Member = {
      firstName: member ? member.firstName : "",
      lastName: member ? member.lastName : "",
      jobTitle: member ? member.jobTitle : "",
      team: member ? member.team : this.teams[0].teamName,
      status: member ? member.status : "Active",
    };
    return memberTemplate;
  }

  /**
   * Get the team object of the org member being edited
   * @param data 
   */
  getTeam(data: string): Team {
    return this.teams.find((res) => {
      return res.teamName == data;
    });
  }

  /**
   * API call to recieve team names list
   */
  getTeamsList() {
    return this.appService.getTeams();
  }

  /**
   * API call to recieve editing member's data
   */
  getMemberData() {
    return this.appService.getMemberById(this.memberId);
  }

  /**
   * Add or Edit org member by submitting form to API Service
   * before navigating back to members page
   * @param form 
   */
  onSubmit(form: FormGroup) {
    this.memberModel = form.value;

    if (this.memberId) {
      this.appService
        .editMember(this.memberModel, this.memberId)
        .subscribe((res) => {
          this.router.navigate(["members"]);
        });
    } else {
      this.appService.addMember(this.memberModel).subscribe((res) => {
        this.router.navigate(["members"]);
      });
    }
  }
}