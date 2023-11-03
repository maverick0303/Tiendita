import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPAdminPage } from './editar-p-admin.page';

describe('EditarPAdminPage', () => {
  let component: EditarPAdminPage;
  let fixture: ComponentFixture<EditarPAdminPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(EditarPAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
