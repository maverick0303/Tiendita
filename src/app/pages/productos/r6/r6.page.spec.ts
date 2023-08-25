import { ComponentFixture, TestBed } from '@angular/core/testing';
import { R6Page } from './r6.page';

describe('R6Page', () => {
  let component: R6Page;
  let fixture: ComponentFixture<R6Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(R6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
