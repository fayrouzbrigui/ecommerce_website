import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperuserSignupComponent } from './superuser-signup.component';

describe('SuperuserSignupComponent', () => {
  let component: SuperuserSignupComponent;
  let fixture: ComponentFixture<SuperuserSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperuserSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperuserSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
