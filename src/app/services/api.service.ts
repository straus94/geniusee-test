import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, delay, of, tap } from 'rxjs';
import { ICountry } from '../app.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public isLoading$: Observable<boolean> = this.isLoading.asObservable();

  constructor(private http: HttpClient) {}

  public getCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>('https://restcountries.com/v3.1/all');
  }

  public fakeHttp(value: string): Observable<null> {
    return of(null).pipe(delay(1000));
  }

  public fakeSubmit(): Observable<boolean> {
    return of(true).pipe(
      tap(() => this.isLoading.next(true)),
      delay(1000),
      tap(() => this.isLoading.next(false))
    );
  }
}
