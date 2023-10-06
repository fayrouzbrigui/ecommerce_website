import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFilteroptionComponent } from './edit-filteroption.component';

describe('EditFilteroptionComponent', () => {
  let component: EditFilteroptionComponent;
  let fixture: ComponentFixture<EditFilteroptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditFilteroptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditFilteroptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
