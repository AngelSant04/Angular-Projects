import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private search(endpoint: string, term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/${endpoint}/${term}`;
    return this.http.get<Country[]>(url).pipe(
      catchError((error) => {
        console.log(`Error al buscar en ${endpoint}:`, error);
        return of([]);
      })
      // delay(2000)
    );
  }

  // searchCapital(term: string): Observable<Country[]> {
  //   const url = `${this.apiUrl}/capital/${term}`;
  //   return this.http.get<Country[]>(url).pipe(
  //     tap((countries) => console.log('Tap 1', countries)),
  //     map((countries) => []),
  //     tap((countries) => console.log('Tap 2', countries))
  //     of -> Sirve para crear un nuevo observable basado en el argumento que le pasamos
  //     catchError((error) => {
  //       console.log(error);
  //       return of([]);
  //     })
  //   );
  // }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((error) => {
        return of(null);
      })
    );
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.search('capital', term).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCapital = {
            term,
            countries,
          })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCountry(term: string): Observable<Country[]> {
    return this.search('name', term).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byCountries = {
            term,
            countries,
          })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    return this.search('region', region).pipe(
      tap(
        (countries) =>
          (this.cacheStore.byRegion = {
            region,
            countries,
          })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }
}
