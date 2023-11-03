import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudiinaPage } from './audiina.page';

describe('AudiinaPage', () => {
  let component: AudiinaPage;
  let fixture: ComponentFixture<AudiinaPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(AudiinaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
