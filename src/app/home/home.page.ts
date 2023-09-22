import { Component } from '@angular/core';
import { BdserviceService } from '../services/bd.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public bd: BdserviceService) {
  }

}
