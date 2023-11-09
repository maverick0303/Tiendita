import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {
  apiurl = 'https://api.victorsanmartin.com/feriados/en.json';

  constructor(private http: HttpClient) { }

  obtenerUsuario(): Observable<any> {
    return this.http.get(this.apiurl+"/holidays").pipe(
      retry(3)
    );
  }
}
