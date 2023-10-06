import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsByMainCategComponent } from './products-by-main-categ.component';

describe('ProductsByMainCategComponent', () => {
  let component: ProductsByMainCategComponent;
  let fixture: ComponentFixture<ProductsByMainCategComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsByMainCategComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsByMainCategComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
