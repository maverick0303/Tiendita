import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Importa HttpClientTestingModule
import { FeriadosPage } from './feriados.page';

describe('FeriadosPage', () => {
  let component: FeriadosPage;
  let fixture: ComponentFixture<FeriadosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FeriadosPage],
      imports: [HttpClientTestingModule], // Agrega HttpClientTestingModule aquí
    }).compileComponents();

    fixture = TestBed.createComponent(FeriadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
