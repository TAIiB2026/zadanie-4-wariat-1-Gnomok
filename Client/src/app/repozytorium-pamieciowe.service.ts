import { Injectable } from '@angular/core';
import { GetDataInterface, PaginatedResponse } from './interfaces/get-data.interface';
import { FormSubmitInterface } from './interfaces/form-submit.interface';
import { Observable, of } from 'rxjs';
import { ProduktClass } from './classes/produkt.class';

@Injectable()
export class RepozytoriumPamiecioweService implements GetDataInterface, FormSubmitInterface {
  private idGenerator = 1;
  private readonly data: ProduktClass[] = [
    new ProduktClass(this.idGenerator++, "Arbuz", 5.0, new Date(2026, 5, 10)),
    new ProduktClass(this.idGenerator++, "Banan", 7.5, new Date(2026, 6, 15)),
    new ProduktClass(this.idGenerator++, "Jabłko", 4.2, new Date(2026, 7, 20)),
    new ProduktClass(this.idGenerator++, "Pomarańcza", 6.8, new Date(2026, 8, 5)),
    new ProduktClass(this.idGenerator++, "Gruszka", 5.9, new Date(2026, 9, 12))
  ]

  Get(pageNumber: number = 1, pageSize: number = 5, nazwaFilter: string = ''): Observable<PaginatedResponse> {
    let filtered = this.data;
    
    if (nazwaFilter && nazwaFilter.trim() !== '') {
      filtered = this.data.filter(x => 
        x.nazwa.toLowerCase().includes(nazwaFilter.toLowerCase())
      );
    }

    const totalCount = filtered.length;
    const skip = (pageNumber - 1) * pageSize;
    const paged = filtered.slice(skip, skip + pageSize);

    const response: PaginatedResponse = {
      data: paged.map(x => new ProduktClass(x.id, x.nazwa, x.cena, x.dataWaznosci)),
      totalCount: totalCount,
      pageNumber: pageNumber,
      pageSize: pageSize
    };

    return of(response);
  }

  GetByID(id: number): Observable<ProduktClass> {
    const obj = this.data.find(x => x.id === id);
    if(obj) {
      const kopia = new ProduktClass(obj.id, obj.nazwa, obj.cena, obj.dataWaznosci);
      return of(kopia);
    }
    throw new Error("Nie znaleziono obiektu.");
  }

  Post(nazwa: string, cena: number, data: Date): Observable<boolean> {
    const newObj = new ProduktClass(this.idGenerator++, nazwa, cena, data);
    this.data.push(newObj);
    return of(true);
  }

  Put(id: number, nazwa: string, cena: number, data: Date): Observable<boolean> {
    const obj = this.data.find(x => x.id === id);
    if(obj) {
      obj.nazwa = nazwa;
      obj.cena = cena;
      obj.dataWaznosci = data;
      return of(true);
    }
    return of(false);
  }

  Delete(id: number): Observable<boolean> {
    const index = this.data.findIndex(x => x.id === id);
    if(index !== -1) {
      this.data.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}