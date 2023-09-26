import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaregistrosPage } from './listaregistros.page';

describe('ListaregistrosPage', () => {
  let component: ListaregistrosPage;
  let fixture: ComponentFixture<ListaregistrosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListaregistrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
