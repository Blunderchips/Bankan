import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Book } from '../elements/book/book.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private selectedBooksSource = new BehaviorSubject<Book[]>([
    // Matt(08/06/2019): Default to empty array.
  ]);
  selectedBooks: Observable<Book[]> = this.selectedBooksSource.asObservable();

  constructor() { }
}
