import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rd1Page } from './rd1.page';

describe('Rd1Page', () => {
  let component: Rd1Page;
  let fixture: ComponentFixture<Rd1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Rd1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
