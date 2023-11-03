import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaUsuarioPage } from './lista-usuario.page';

describe('ListaUsuarioPage', () => {
  let component: ListaUsuarioPage;
  let fixture: ComponentFixture<ListaUsuarioPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(ListaUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
