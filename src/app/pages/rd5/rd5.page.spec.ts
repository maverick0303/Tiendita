import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rd5Page } from './rd5.page';

describe('Rd5Page', () => {
  let component: Rd5Page;
  let fixture: ComponentFixture<Rd5Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Rd5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
