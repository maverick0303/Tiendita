import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ai6Page } from './ai6.page';

describe('Ai6Page', () => {
  let component: Ai6Page;
  let fixture: ComponentFixture<Ai6Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Ai6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
