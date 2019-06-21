import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { WhiteList } from '../models/white-list.model';
import { Book } from '../book/models/book.model';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material';

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
     * Whether a user is logged in or not.
     */
    isLoggedIn: boolean;

    /**
     * App title to be displayed on the menu bar.
     */
    @Input() title: string;

    /**
     * Whether a given Book should be shown or not.
     */
    selected = {};
    /**
     * Object of books stored in database.
     */
    books = {};

    whiteList: Observable<WhiteList[]>;

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
        .pipe(
            map(result => result.matches)
        );

    @ViewChild('drawer', { static: true }) public sidenav: MatSidenav;

    constructor(
        private breakpointObserver: BreakpointObserver,
        private afs: AngularFirestore,
        private auth: AngularFireAuth,
        private router: Router,
    ) {
        this.isLoggedIn = false;
    }

    ngOnInit(): void {
        this.auth.user.subscribe(user => {
            if (user) {
                // this.books = this.afs.collection<Book>('books').valueChanges();

                this.whiteList = this.afs.collection<WhiteList>('white_list',
                    ref => ref.where('user', '==', user.uid)).valueChanges();

                this.whiteList.subscribe(arr => {
                    arr.forEach(i => {
                        this.afs.doc<Book>(`books/${i.book}`).valueChanges().subscribe(book => {
                            this.books[book.uid] = book.name;
                        });
                    });
                });
            }
        });

        // For ngx-avatar
        this.auth.user.subscribe(user => {
            if (!user) {
                this.isLoggedIn = false;
            } else {
                this.isLoggedIn = true;

                this.name = user.displayName;
                this.email = user.email;
                this.photo = user.photoURL;
            }
        });
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

    getBookName(book: string) {
        if (this.books[book]) {
            return this.books[book];
        } else {
            return book;
        }
    }

    /**
     * Nagivate to a selected book and close nav bar.
     * 
     * @param bookUid book to display
     */
    gotoBook(bookUid: string) {
        this.isHandset$.subscribe(isOpen => {
            if (isOpen) {
                this.sidenav.close();
            }
            this.router.navigate(['/home', bookUid]);
        });
    }
}