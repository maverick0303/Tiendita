import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AudigamerPage } from './audigamer.page';

describe('AudigamerPage', () => {
  let component: AudigamerPage;
  let fixture: ComponentFixture<AudigamerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AudigamerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
