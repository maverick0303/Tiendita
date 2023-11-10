import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feriados',
  templateUrl: './feriados.page.html',
  styleUrls: ['./feriados.page.scss'],
})
export class FeriadosPage implements OnInit {

  holidays: any;
  constructor() { }

  ngOnInit() {
  }

}
