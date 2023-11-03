import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ag3Page } from './ag3.page';

describe('Ag3Page', () => {
  let component: Ag3Page;
  let fixture: ComponentFixture<Ag3Page>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(Ag3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
