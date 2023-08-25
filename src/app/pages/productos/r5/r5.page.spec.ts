import { ComponentFixture, TestBed } from '@angular/core/testing';
import { R5Page } from './r5.page';

describe('R5Page', () => {
  let component: R5Page;
  let fixture: ComponentFixture<R5Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(R5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
