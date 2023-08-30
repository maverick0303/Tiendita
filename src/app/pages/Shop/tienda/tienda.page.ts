import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  rol: number = 0;

  constructor(private activeRoute: ActivatedRoute,private router: Router) {
    
   }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((param) => {
      this.rol = this.router.getCurrentNavigation()?.extras?.state?.['roles'];
    });
  }
}



