import { TestBed, inject } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { UserService } from "./user.service";

describe("UserService", () => {
  let service: UserService;

  beforeEach(() => {
    var store = {};

    spyOn(localStorage, 'getItem').and.callFake( (key:string):String => {
     return store[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key:string):void =>  {
      delete store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string):string =>  {
      return store[key] = <string>value;
    });
    spyOn(localStorage, 'clear').and.callFake(() =>  {
        store = {};
    });
    
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [HttpClientModule],
    });

    service = TestBed.get(UserService);
  });

  it("UserService should be created", inject(
    [UserService],
    (service: UserService) => {
      expect(service).toBeTruthy();
    }
  ));

  it("Should Login", inject([UserService], () => {
    const mockedData = "TOKEN";
    
    localStorage.clear();
    service.login(mockedData);
    
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.getItem('TOKEN')).toBe(mockedData);
  }));

  it("Should Be Logged In", inject([UserService], () => {
    const mockedData = "TOKEN";
    service.login(mockedData);
    let logged = service.isLogged();
    
    expect(logged).toBeTruthy();
  }));

  it("Should Logout", inject([UserService], () => {
    const mockedData = "TOKEN";
    service.logout();
    
    expect(localStorage.removeItem).toHaveBeenCalled();
    expect(localStorage.getItem('TOKEN')).toBeNull();
    service.login(mockedData);
  }));

  it("Should set username", inject([UserService], () => {
    const mockedData = "userName";
    service.setUsername(mockedData);
    expect(service.username).toBe(mockedData);
  }));
});
