import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarClavePage } from './modificar-clave.page';

describe('ModificarClavePage', () => {
  let component: ModificarClavePage;
  let fixture: ComponentFixture<ModificarClavePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModificarClavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
