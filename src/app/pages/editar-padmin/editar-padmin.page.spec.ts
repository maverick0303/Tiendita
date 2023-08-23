import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarPadminPage } from './editar-padmin.page';

describe('EditarPadminPage', () => {
  let component: EditarPadminPage;
  let fixture: ComponentFixture<EditarPadminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarPadminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
