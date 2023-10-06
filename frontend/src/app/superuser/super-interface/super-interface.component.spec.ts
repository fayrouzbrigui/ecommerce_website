import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperInterfaceComponent } from './super-interface.component';

describe('SuperInterfaceComponent', () => {
  let component: SuperInterfaceComponent;
  let fixture: ComponentFixture<SuperInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperInterfaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
