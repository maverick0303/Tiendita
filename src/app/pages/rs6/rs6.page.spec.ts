import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rs6Page } from './rs6.page';

describe('Rs6Page', () => {
  let component: Rs6Page;
  let fixture: ComponentFixture<Rs6Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Rs6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
