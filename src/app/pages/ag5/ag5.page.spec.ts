import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ag5Page } from './ag5.page';

describe('Ag5Page', () => {
  let component: Ag5Page;
  let fixture: ComponentFixture<Ag5Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Ag5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
