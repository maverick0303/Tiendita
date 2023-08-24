import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rs2Page } from './rs2.page';

describe('Rs2Page', () => {
  let component: Rs2Page;
  let fixture: ComponentFixture<Rs2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Rs2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
