import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCategoriesListComponent } from './main-categories-list.component';

describe('MainCategoriesListComponent', () => {
  let component: MainCategoriesListComponent;
  let fixture: ComponentFixture<MainCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCategoriesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
