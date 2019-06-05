import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Book } from 'src/app/elements/book/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private books: Observable<Book[]>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.books = this.afs.collection<Book>('books').valueChanges();
  }

}
