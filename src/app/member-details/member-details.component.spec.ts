import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MemberDetailsComponent } from "./member-details.component";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";

import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppService } from "../app.service";
import { Adapters, Member } from "../app.model";
import { NeedAuthGuard } from "../shared/gaurds/needAuthGaurd";
import { of } from "rxjs/internal/observable/of";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { HttpLoaderFactory } from "../app.module";

// Bonus points!
describe("MemberDetailsComponent", () => {
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  let memberForm: FormGroup;

  /**
   * Because we are subscribing to the routing, we need
   * use a value of an id to mock for the test. Using 1 for simplicity sake
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberDetailsComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [
        HttpClient,
        FormBuilder,
        AppService,
        Adapters,
        NeedAuthGuard,
        { provide: ActivatedRoute, useValue: { params: of({ id: 2 }) } },
        {
          provide: Router,
          useClass: class {
            navigate = jasmine.createSpy("navigate");
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MemberDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    return new Promise(function(resolve) {
      component.ngOnInit();
      resolve();
    });
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.memberForm.valid).toBeFalsy();
  });

  it('form submits', () => {
    component.memberForm.controls["firstName"].setValue("Automated");;
    component.memberForm.controls["lastName"].setValue("Test");
    component.memberForm.controls["jobTitle"].setValue("Adding");
    component.memberForm.controls["team"].setValue({
      id: 1,
      teamName: "Formula 1 - Car 77",
    });
    component.memberForm.controls["status"].setValue("Active");

    memberForm = component.memberForm;

    component.onSubmit(component.memberForm)

    expect(memberForm.valid).toBeTruthy();
  });
});
