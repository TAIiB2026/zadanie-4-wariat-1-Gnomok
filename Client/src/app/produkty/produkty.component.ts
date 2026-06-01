import { Component, inject, OnInit } from '@angular/core';
import { GET_DATA_TOKEN } from '../tokens/get-data.token';

@Component({
  selector: 'taiib2-produkty',
  standalone: false,
  templateUrl: './produkty.component.html',
  styles: ``
})
export class ProduktyComponent implements OnInit {
  private readonly service = inject(GET_DATA_TOKEN);
  
  public data: any[] = [];
  public wczytywanie = false;
  public pageNumber = 1;
  public pageSize = 5;
  public totalCount = 0;
  public nazwaFilter = '';

  ngOnInit(): void {
    this.zaladujDane();
  }

  public zaladujDane(): void {
    this.wczytywanie = true;
    this.service.Get(this.pageNumber, this.pageSize, this.nazwaFilter).subscribe({
      next: (response) => {
        this.data = response.data;
        this.totalCount = response.totalCount;
        this.wczytywanie = false;
      },
      error: (err) => {
        console.error(err);
        alert("Błąd podczas ładowania danych.");
        this.wczytywanie = false;
      }
    });
  }

  public nastepnaStrona(): void {
    if (this.pageNumber * this.pageSize < this.totalCount) {
      this.pageNumber++;
      this.zaladujDane();
    }
  }

  public poprzedniaStrona(): void {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.zaladujDane();
    }
  }

  public filtruj(): void {
    this.pageNumber = 1;
    this.zaladujDane();
  }

  public usun(id: number): void {
    if (confirm("Czy na pewno chcesz usunąć ten produkt?")) {
      this.service.Delete(id).subscribe({
        next: (result) => {
          if (result) {
            alert("Produkt usunięty.");
            this.zaladujDane();
          } else {
            alert("Nie udało się usunąć produktu.");
          }
        },
        error: (err) => {
          console.error(err);
          alert("Błąd podczas usuwania produktu.");
        }
      });
    }
  }

  get iloscStron(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }
}