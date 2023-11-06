import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelojdigPage } from './relojdig.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


describe('RelojdigPage', () => {
  let component: RelojdigPage;
  let fixture: ComponentFixture<RelojdigPage>;

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

    fixture = TestBed.createComponent(RelojdigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
