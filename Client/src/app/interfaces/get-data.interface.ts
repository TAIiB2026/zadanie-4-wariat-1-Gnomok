import { Observable } from "rxjs";
import { ProduktClass } from "../classes/produkt.class";

export interface PaginatedResponse {
    data: ProduktClass[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
}

export interface GetDataInterface {
    Get(pageNumber?: number, pageSize?: number, nazwaFilter?: string): Observable<PaginatedResponse>;
    GetByID(id: number): Observable<ProduktClass>;
    Delete(id: number): Observable<boolean>;
}