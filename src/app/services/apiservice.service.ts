import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  apiurl = 'https://api.victorsanmartin.com/feriados/en.json';

  constructor(private http: HttpClient) { }

  obtenerFeriados(): Observable<any> {
    return this.http.get(this.apiurl);
  }
}


