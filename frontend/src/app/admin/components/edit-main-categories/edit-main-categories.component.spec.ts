import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMainCategoriesComponent } from './edit-main-categories.component';

describe('EditMainCategoriesComponent', () => {
  let component: EditMainCategoriesComponent;
  let fixture: ComponentFixture<EditMainCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMainCategoriesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMainCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
