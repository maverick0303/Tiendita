import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rd2Page } from './rd2.page';

describe('Rd2Page', () => {
  let component: Rd2Page;
  let fixture: ComponentFixture<Rd2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Rd2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
