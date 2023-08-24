import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ag6Page } from './ag6.page';

describe('Ag6Page', () => {
  let component: Ag6Page;
  let fixture: ComponentFixture<Ag6Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Ag6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
