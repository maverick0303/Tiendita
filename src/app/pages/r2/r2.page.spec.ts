import { ComponentFixture, TestBed } from '@angular/core/testing';
import { R2Page } from './r2.page';

describe('R2Page', () => {
  let component: R2Page;
  let fixture: ComponentFixture<R2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(R2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
