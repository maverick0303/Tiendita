import { ComponentFixture, TestBed } from '@angular/core/testing';
import { R3Page } from './r3.page';

describe('R3Page', () => {
  let component: R3Page;
  let fixture: ComponentFixture<R3Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(R3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
