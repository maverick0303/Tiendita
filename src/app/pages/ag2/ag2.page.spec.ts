import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ag2Page } from './ag2.page';

describe('Ag2Page', () => {
  let component: Ag2Page;
  let fixture: ComponentFixture<Ag2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Ag2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
