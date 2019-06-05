import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Book } from './book.model';
import { List } from '../list/list.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book: Book;

  private lists: any;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.lists = this.afs.collection(this.book.uid).valueChanges();
  }

  add() {
    const name = window.prompt('enter name');
    if (!name) {
      return;
    }

    const uid = this.afs.createId();
    this.afs.collection<List>(this.book.uid).doc(uid).set(
      {
        uid,
        name,
        description: uid
      }
    );
  }
}
