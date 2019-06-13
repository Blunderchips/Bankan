import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private selectedBooksSource = new BehaviorSubject<string[]>([
    // Matt(08/06/2019): Default to empty array.
  ]);
  selectedBooks: Observable<string[]> = this.selectedBooksSource.asObservable();

  constructor() { }
}
