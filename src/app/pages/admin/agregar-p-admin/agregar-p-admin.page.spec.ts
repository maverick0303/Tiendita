import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarPAdminPage } from './agregar-p-admin.page';

describe('AgregarPAdminPage', () => {
  let component: AgregarPAdminPage;
  let fixture: ComponentFixture<AgregarPAdminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AgregarPAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
