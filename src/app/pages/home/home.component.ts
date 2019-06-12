import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { DataService } from 'src/app/services/data.service';

import { Book } from 'src/app/elements/book/book.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public books: Observable<string[]>; // Matt(2019/06/06):Needs to be public

  constructor(private afs: AngularFirestore, private data: DataService) { }

  ngOnInit() {
    this.books = this.data.selectedBooks;
  }

}
