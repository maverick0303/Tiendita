import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MDatosPage } from './m-datos.page';

describe('MDatosPage', () => {
  let component: MDatosPage;
  let fixture: ComponentFixture<MDatosPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(MDatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
