import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelojAnaPage } from './reloj-ana.page';

describe('RelojAnaPage', () => {
  let component: RelojAnaPage;
  let fixture: ComponentFixture<RelojAnaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RelojAnaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
