import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperuserLoginComponent } from './superuser-login.component';

describe('SuperuserLoginComponent', () => {
  let component: SuperuserLoginComponent;
  let fixture: ComponentFixture<SuperuserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperuserLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperuserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
