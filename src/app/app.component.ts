import { Component } from '@angular/core';
import { BdserviceService } from './services/bd.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private bd: BdserviceService) {}


}
