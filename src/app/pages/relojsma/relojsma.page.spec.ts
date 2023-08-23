import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelojsmaPage } from './relojsma.page';

describe('RelojsmaPage', () => {
  let component: RelojsmaPage;
  let fixture: ComponentFixture<RelojsmaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RelojsmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
