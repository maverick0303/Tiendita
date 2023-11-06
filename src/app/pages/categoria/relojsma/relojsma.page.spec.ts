import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RelojsmaPage } from './relojsma.page';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

describe('RelojsmaPage', () => {
  let component: RelojsmaPage;
  let fixture: ComponentFixture<RelojsmaPage>;

  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: Storage, useValue: {} },
        SQLite
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RelojsmaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
