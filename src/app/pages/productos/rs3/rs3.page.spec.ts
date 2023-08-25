import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rs3Page } from './rs3.page';

describe('Rs3Page', () => {
  let component: Rs3Page;
  let fixture: ComponentFixture<Rs3Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Rs3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
