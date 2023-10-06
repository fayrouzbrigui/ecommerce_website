import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBrandsComponent } from './edit-brands.component';

describe('EditBrandsComponent', () => {
  let component: EditBrandsComponent;
  let fixture: ComponentFixture<EditBrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBrandsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
