import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupsupplierComponent } from './signupsupplier.component';

describe('SignupsupplierComponent', () => {
  let component: SignupsupplierComponent;
  let fixture: ComponentFixture<SignupsupplierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupsupplierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupsupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
