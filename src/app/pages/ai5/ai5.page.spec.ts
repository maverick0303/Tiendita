import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ai5Page } from './ai5.page';

describe('Ai5Page', () => {
  let component: Ai5Page;
  let fixture: ComponentFixture<Ai5Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Ai5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
