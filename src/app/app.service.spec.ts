import { TestBed, inject } from '@angular/core/testing';
import { AppService } from './app.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ROUTES } from './app.constants';

describe('AppService', () => {
  let service: AppService;
  let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppService],
      imports: [HttpClientModule, HttpClientTestingModule]
    });
    
    service = TestBed.get(AppService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('AppService should be created', inject([AppService], (service: AppService) => {
    expect(service).toBeTruthy();
  }));

  it('getMembers should run', inject([AppService], () => {
    const mockedData = [{
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "jobTitle": "Driver",
      "team": "Formula 1 - Car 77",
      "status": "Active"
    },    {
      "firstName": "Alexy",
      "lastName": "Sainz",
      "jobTitle": "Driver",
      "team": "Formula 1 - Car 77",
      "status": "Active",
      "id": 2
    }];

    service.getMembers().subscribe(res => {
      expect(res.length).toBe(2);
      expect(res).toEqual(mockedData)
    });

    const request = httpMock.expectOne(`${service.api + ROUTES.MEMBERS}`);

    expect(request.request.method).toBe('GET');

    request.flush(mockedData);
  }));
  
  it('getMembersById should run', inject([AppService], () => {
    const mockedData = {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "jobTitle": "Driver",
      "team": "Formula 1 - Car 77",
      "status": "Active"
    };

    service.getMemberById(mockedData.id).subscribe(res => {
      expect(res).toEqual(mockedData)
    });

    const request = httpMock.expectOne(`${service.api}${ROUTES.MEMBERS}/${mockedData.id}`);

    expect(request.request.method).toBe('GET');

    request.flush(mockedData);
  }));
  
  it('addMembers should run', inject([AppService], () => {
    const mockedData = {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "jobTitle": "Driver",
      "team": "Formula 1 - Car 77",
      "status": "Active"
    };

    service.addMember(mockedData).subscribe(res => {
      expect(res).toEqual(mockedData);
    });

    const request = httpMock.expectOne(`${service.api}${ROUTES.ADD_MEMBER}`);

    expect(request.request.method).toBe('POST');

    request.flush(mockedData);
  }));
  
  it('editMembers should run', inject([AppService], () => {
    const mockedData = {
      "firstName": "Alexy",
      "lastName": "Sainz",
      "jobTitle": "Driver",
      "team": "Formula 1 - Car 77",
      "status": "Active",
      "id": 2
    };

    service.editMember(mockedData, mockedData.id).subscribe(res => {
      expect(res).toEqual(mockedData);
    });

    const request = httpMock.expectOne(`${service.api}${ROUTES.EDIT_MEMBER}/${mockedData.id}`);

    expect(request.request.method).toBe('PUT');

    request.flush(mockedData);
  }));
  
  it('deleteMembers should run', inject([AppService], () => {
    const mockedData = {
      "firstName": "Alexy",
      "lastName": "Sainz",
      "jobTitle": "Driver",
      "team": "Formula 1 - Car 77",
      "status": "Active",
      "id": 2
    };

    service.deleteMember(mockedData.id).subscribe(res => {
      expect(res).toEqual(mockedData);
    });

    const request = httpMock.expectOne(`${service.api}${ROUTES.DELETE_MEMBER}/${mockedData.id}`);

    expect(request.request.method).toBe('DELETE');

    request.flush(mockedData);
  }));

  it('getTeams should run', inject([AppService], () => {
    const mockedData = [
      {
        "id": 1,
        "teamName": "Formula 1 - Car 77"
      },
      {
        "id": 2,
        "teamName": "Formula 1 - Car 8"
      },
      {
        "id": 3,
        "teamName": "Formula 2 - Car 54"
      }
    ];

    service.getTeams().subscribe(res => {
      expect(res.length).toBe(3);
      expect(res).toEqual(mockedData);
    });

    const request = httpMock.expectOne(`${service.api + ROUTES.TEAMS}`);

    expect(request.request.method).toBe('GET');

    request.flush(mockedData);
  }));
});
