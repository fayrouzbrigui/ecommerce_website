import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMainCategoriesListComponent } from './add-main-categories-list.component';

describe('AddMainCategoriesListComponent', () => {
  let component: AddMainCategoriesListComponent;
  let fixture: ComponentFixture<AddMainCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMainCategoriesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMainCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
