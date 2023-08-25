import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rs4Page } from './rs4.page';

describe('Rs4Page', () => {
  let component: Rs4Page;
  let fixture: ComponentFixture<Rs4Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Rs4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
