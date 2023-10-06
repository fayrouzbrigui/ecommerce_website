import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersOptionsListComponent } from './filters-options-list.component';

describe('FiltersOptionsListComponent', () => {
  let component: FiltersOptionsListComponent;
  let fixture: ComponentFixture<FiltersOptionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltersOptionsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltersOptionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
