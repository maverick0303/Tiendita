import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarritoPage } from './carrito.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { CurrencyPipe } from '@angular/common'; // Importa la tubería 'currency' desde '@angular/common'

describe('CarritoPage', () => {
  let component: CarritoPage;
  let fixture: ComponentFixture<CarritoPage>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CarritoPage], // Añade el componente a 'declarations'
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: Storage, useValue: {}, CurrencyPipe }, // Puedes usar un objeto vacío como mock para Storage
        SQLite
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
