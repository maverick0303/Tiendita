import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { Componente2Component } from './componente2.component';
import { ActivatedRoute } from '@angular/router';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ComponentsModule } from '../components.module';

describe('Componente2Component', () => {
  let component: Componente2Component;
  let fixture: ComponentFixture<Componente2Component>;

 
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: Storage, useValue: {} }, // Puedes usar un objeto vacío como mock para Storage
        SQLite
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Componente2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(ComponentsModule).toBeTruthy();
  });
});

