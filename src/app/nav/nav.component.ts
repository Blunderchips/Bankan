import { Component, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { WhiteList } from '../models/white-list.model';
import { Book } from '../elements/book/book.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  /**
   * App title to be displayed on the menu bar.
   */
  @Input() title: string;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private afs: AngularFirestore,
    private auth: AngularFireAuth
  ) { }

  addList(): void {
    this.auth.user.subscribe(user => {
      const name = window.prompt('name of list');
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
}
