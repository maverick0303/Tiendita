import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rd4Page } from './rd4.page';

describe('Rd4Page', () => {
  let component: Rd4Page;
  let fixture: ComponentFixture<Rd4Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Rd4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
