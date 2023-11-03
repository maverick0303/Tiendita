import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelojdigPage } from './relojdig.page';

describe('RelojdigPage', () => {
  let component: RelojdigPage;
  let fixture: ComponentFixture<RelojdigPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(RelojdigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
