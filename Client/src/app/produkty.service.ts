import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetDataInterface, PaginatedResponse } from './interfaces/get-data.interface';
import { FormSubmitInterface } from './interfaces/form-submit.interface';
import { Observable } from 'rxjs';
import { ProduktClass } from './classes/produkt.class';

@Injectable()
export class ProduktService implements GetDataInterface, FormSubmitInterface {
  private apiUrl = 'http://localhost:5104/api/produkty';

  constructor(private http: HttpClient) {}

  Get(pageNumber: number = 1, pageSize: number = 5, nazwaFilter: string = ''): Observable<PaginatedResponse> {
    let url = `${this.apiUrl}?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    
    if (nazwaFilter && nazwaFilter.trim() !== '') {
      url += `&nazwaFilter=${encodeURIComponent(nazwaFilter)}`;
    }

    return this.http.get<PaginatedResponse>(url);
  }

  GetByID(id: number): Observable<ProduktClass> {
    return this.http.get<ProduktClass>(`${this.apiUrl}/${id}`);
  }

  Post(nazwa: string, cena: number, data: Date): Observable<boolean> {
    const payload = {
      nazwa: nazwa,
      cena: cena,
      dataWaznosci: data
    };
    return this.http.post<boolean>(this.apiUrl, payload);
  }

  Put(id: number, nazwa: string, cena: number, data: Date): Observable<boolean> {
    const payload = {
      nazwa: nazwa,
      cena: cena,
      dataWaznosci: data
    };
    return this.http.put<boolean>(`${this.apiUrl}/${id}`, payload);
  }

  Delete(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}