import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginaerrorPage } from './paginaerror.page';

describe('PaginaerrorPage', () => {
  let component: PaginaerrorPage;
  let fixture: ComponentFixture<PaginaerrorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaginaerrorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
