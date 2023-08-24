import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rd6Page } from './rd6.page';

describe('Rd6Page', () => {
  let component: Rd6Page;
  let fixture: ComponentFixture<Rd6Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Rd6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
