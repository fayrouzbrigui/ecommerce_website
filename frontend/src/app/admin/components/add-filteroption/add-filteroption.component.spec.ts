import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilteroptionComponent } from './add-filteroption.component';

describe('AddFilteroptionComponent', () => {
  let component: AddFilteroptionComponent;
  let fixture: ComponentFixture<AddFilteroptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFilteroptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFilteroptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
