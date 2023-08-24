import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ai1Page } from './ai1.page';

describe('Ai1Page', () => {
  let component: Ai1Page;
  let fixture: ComponentFixture<Ai1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Ai1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
