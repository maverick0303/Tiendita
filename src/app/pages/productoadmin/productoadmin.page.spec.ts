import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductoadminPage } from './productoadmin.page';

describe('ProductoadminPage', () => {
  let component: ProductoadminPage;
  let fixture: ComponentFixture<ProductoadminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProductoadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
