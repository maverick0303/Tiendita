import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ag4Page } from './ag4.page';

describe('Ag4Page', () => {
  let component: Ag4Page;
  let fixture: ComponentFixture<Ag4Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Ag4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
