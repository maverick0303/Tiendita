import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ai3Page } from './ai3.page';

describe('Ai3Page', () => {
  let component: Ai3Page;
  let fixture: ComponentFixture<Ai3Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Ai3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
