import { ComponentFixture, TestBed } from '@angular/core/testing';
import { R4Page } from './r4.page';

describe('R4Page', () => {
  let component: R4Page;
  let fixture: ComponentFixture<R4Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(R4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
