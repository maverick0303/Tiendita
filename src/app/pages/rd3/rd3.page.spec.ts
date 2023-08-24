import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rd3Page } from './rd3.page';

describe('Rd3Page', () => {
  let component: Rd3Page;
  let fixture: ComponentFixture<Rd3Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Rd3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
