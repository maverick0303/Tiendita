import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevoAdminPage } from './nuevo-admin.page';

describe('NuevoAdminPage', () => {
  let component: NuevoAdminPage;
  let fixture: ComponentFixture<NuevoAdminPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(NuevoAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
