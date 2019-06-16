import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { Book } from '../models/book.model';
import { List } from '../models/list.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  /**
   * Book's primary key.
   */
  uid: string;

  public book: Book = { uid: '', name: '', creator: '' }; // Matt(2016/06/12): Need to set default value
  public lists: Observable<List[]>; // Matt(2019/06/06):Needs to be public

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      const bookUid = params.bookUid;
      console.log(bookUid);
      if (bookUid) {
        this.uid = bookUid;

        // Need to select a single book with a given uid.
        //
        this.afs.collection<Book>('books',
          ref => ref.where('uid', '==', this.uid).limit(1)).valueChanges().subscribe(books => {
            books.forEach(book => { // Should only run once. TODO: there must be a better way to do this.
              this.book = book;
              // console.log(book);
            });
          });

        this.lists = this.afs.collection<List>(this.uid).valueChanges();
      }
    });
  }

  add() {
    const name = window.prompt('enter name').trim();
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
