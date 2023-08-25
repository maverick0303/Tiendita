import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ai4Page } from './ai4.page';

describe('Ai4Page', () => {
  let component: Ai4Page;
  let fixture: ComponentFixture<Ai4Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Ai4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
