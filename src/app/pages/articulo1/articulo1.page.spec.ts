import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Articulo1Page } from './articulo1.page';

describe('Articulo1Page', () => {
  let component: Articulo1Page;
  let fixture: ComponentFixture<Articulo1Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Articulo1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
