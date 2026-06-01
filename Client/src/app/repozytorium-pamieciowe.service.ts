import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataInterface } from './interfaces/get-data.interface';
import { FormSubmitInterface } from './interfaces/form-submit.interface';
import { map, Observable, of } from 'rxjs';
import { ProduktClass } from './classes/produkt.class';

interface ProduktDto {
  id: number;
  nazwa: string;
  cena: number;
  dataWaznosci: string;
}

@Injectable()
export class RepozytoriumPamiecioweService implements GetDataInterface, FormSubmitInterface {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:5104/api/products';

  private idGenerator = 1;
  private readonly data: ProduktClass[] = [
    new ProduktClass(this.idGenerator++, 'Arbuz', 5.0, new Date(2026, 5, 10)),
    new ProduktClass(this.idGenerator++, 'Banan', 7.5, new Date(2026, 6, 15)),
    new ProduktClass(this.idGenerator++, 'Jabłko', 4.2, new Date(2026, 7, 20)),
    new ProduktClass(this.idGenerator++, 'Pomarańcza', 6.8, new Date(2026, 8, 5)),
    new ProduktClass(this.idGenerator++, 'Gruszka', 5.9, new Date(2026, 9, 12))
  ];

  Post(nazwa: string, cena: number, data: Date): Observable<boolean> {
    const newObj = new ProduktClass(this.idGenerator++, nazwa, cena, data);
    this.data.push(newObj);
    return of(true);
  }

  Put(id: number, nazwa: string, cena: number, data: Date): Observable<boolean> {
    const obj = this.data.find(x => x.id === id);
    if (obj) {
      obj.nazwa = nazwa;
      obj.cena = cena;
      obj.dataWaznosci = data;
      return of(true);
    }

    return of(false);
  }

  Get(): Observable<ProduktClass[]> {
    return this.httpClient.get<ProduktDto[]>(this.apiUrl).pipe(
      map(data => data.map(x => new ProduktClass(x.id, x.nazwa, x.cena, new Date(x.dataWaznosci))))
    );
  }

  GetByID(id: number): Observable<ProduktClass> {
    return this.httpClient.get<ProduktDto>(`${this.apiUrl}/${id}`).pipe(
      map(x => new ProduktClass(x.id, x.nazwa, x.cena, new Date(x.dataWaznosci)))
    );
  }
}
