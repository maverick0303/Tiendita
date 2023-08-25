import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rs5Page } from './rs5.page';

describe('Rs5Page', () => {
  let component: Rs5Page;
  let fixture: ComponentFixture<Rs5Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Rs5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
