import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ag1Page } from './ag1.page';

describe('Ag1Page', () => {
  let component: Ag1Page;
  let fixture: ComponentFixture<Ag1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Ag1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
