import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { DataService } from '../services/data.service';

import { Book } from '../elements/book/book.model';
import { WhiteList } from '../models/white-list.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  // For ngx-avatar
  name = '';
  email = '';
  photo = '';
  // --

  /**
   * App title to be displayed on the menu bar.
   */
  @Input() title: string;

  /**
   * Whether a given Book should be shown or not.
   */
  selected = {};
  /**
   * Aync collection of books stored in database.
   */
  books: Observable<Book[]>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private afs: AngularFirestore,
    private auth: AngularFireAuth,
    private data: DataService
  ) { }

  ngOnInit(): void {
    this.books = this.afs.collection<Book>('books').valueChanges();

    // For ngx-avatar
    this.auth.user.subscribe(user => this.name = user.displayName);
    this.auth.user.subscribe(user => this.email = user.email);
    this.auth.user.subscribe(user => this.photo = user.photoURL);
    // --
  }

  addBook(): void {
    this.auth.user.subscribe(user => {
      const name = window.prompt('name of list').trim();
      if (!name) {
        console.error('Invalid book name.');
        return;
      }

      const uid = this.afs.createId();

      this.afs.collection('white_list').doc<WhiteList>(`${uid} ${user.uid}`).set({
        book: uid,
        user: user.uid
      });

      this.afs.collection<Book>('books').doc(uid).set({
        name,
        description: uid,
        uid,
        creator: user.uid
      });
    });
  }

  /**
   * Invoked when a Book is clicked on.
   * 
   * @param book the selected book
   */
  showBook(book: Book): void {
    // console.log(book);
    this.selected[book.uid] = !this.selected[book.uid];

    if (this.selected[book.uid]) {
      this.data.selectedBooks.subscribe(books => {
        books.push(book);
      });
    } else {
      this.data.selectedBooks.subscribe(books => {
        const index: number = books.indexOf(book);
        books.splice(index, 1); // removes book from array
      });
    }
  }

  /**
   * @see selected
   * 
   * @param book the book to be tested
   * @returns Whether a given Book is selected
   */
  isSelected(book: Book): boolean {
    return this.selected[book.uid];
  }
}
