import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rs1Page } from './rs1.page';

describe('Rs1Page', () => {
  let component: Rs1Page;
  let fixture: ComponentFixture<Rs1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Rs1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
