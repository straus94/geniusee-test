import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {ICountry} from '../app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public getCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>('https://restcountries.com/v3.1/all');
  }
}
