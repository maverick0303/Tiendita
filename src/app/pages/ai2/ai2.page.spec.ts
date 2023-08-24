import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ai2Page } from './ai2.page';

describe('Ai2Page', () => {
  let component: Ai2Page;
  let fixture: ComponentFixture<Ai2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Ai2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
