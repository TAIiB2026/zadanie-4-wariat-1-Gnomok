import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GET_DATA_TOKEN } from '../tokens/get-data.token';
import { FORM_SUBMIT_TOKEN } from '../tokens/form-submit.token';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'taiib2-formularz',
  standalone: false,
  templateUrl: './formularz.component.html',
  styles: ``
})
export class FormularzComponent implements OnDestroy {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly getDataService = inject(GET_DATA_TOKEN);
  private readonly submitService = inject(FORM_SUBMIT_TOKEN);

  public nazwa: string = '';
  public cena: number = 0;
  public data!: string;
  public id?: number;
  public wczytywanie = true;

  private readonly sub = new Subscription();

  constructor() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if(id != null) {
        const idNumber = parseInt(id);
        if(!isNaN(idNumber)) {
          this.id = idNumber;

          this.getDataService.GetByID(idNumber).subscribe({
            next: res => {
                this.nazwa = res.nazwa;
                this.cena = res.cena;
                this.ustawDate(res.dataWaznosci);
                this.wczytywanie = false;
              }, error: (err) => {
                console.error(err);
                alert("Wystąpił błąd podczas pobierania obiektu.");
              }
            });
        } else {
          this.ustawDate(new Date());
          this.wczytywanie = false;
        }
      } else {
        this.ustawDate(new Date());
        this.wczytywanie = false;
      }
    });
  }
  private ustawDate(data: Date | string): void {
    let dateObj: Date;
    
    if (typeof data === 'string') {
      dateObj = new Date(data);
    } else {
      dateObj = new Date(data);
    }
  
    this.data = `${dateObj.getFullYear()}-${
      String(dateObj.getMonth() + 1).padStart(2, '0')
    }-${
      String(dateObj.getDate()).padStart(2, '0')
    }`;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public onSubmit() {
    this.wczytywanie = true;
    console.log(this.data)
    let request: Observable<boolean>;

    const [year, month, day] = this.data.split('-').map(Number);
    const data: Date = new Date(year, month - 1, day);

    if(this.id != null && this.id > 0) {
      request = this.submitService.Put(this.id, this.nazwa, this.cena, data);
    } else {
      request = this.submitService.Post(this.nazwa, this.cena, data);
    }

    request.subscribe({next: (res) => {
      if(res) {
        this.router.navigateByUrl("/produkty");
      } else {
        alert("Wystąpił błąd podczas próby zapisu zmian.");
        this.wczytywanie = false;
      }
    }, error: (err) => {
      alert("Wystąpił błąd podczas próby zapisu zmian.");
        this.wczytywanie = false;
    }})
  }
}
