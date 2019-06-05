import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import { List, FB_LIST_REF } from 'src/app/elements/list/list.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  lists: any;

  // userUid: string; // FIXME: load when needed in method

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.lists = this.afs.collection(FB_LIST_REF).valueChanges();

    // this.auth.user$.subscribe(user => {
    //   this.userUid = user.uid;
    //   console.log('User Uid loaded:' + this.userUid);
    // });
  }

  add() {
    const item = window.prompt('enter name');
    if (!item) {
      return;
    }
    this.createList(item, 'hello world');
  }

  /**
   * Insert new list in to database. Generates and attached primary key.
   * 
   * @param name name of the list
   * @param description list descriptions
   */
  createList(name: string, description: string): void {
    const uid = this.afs.createId();
    this.afs.collection<List>(FB_LIST_REF).doc(uid).set(
      {
        uid,
        name,
        description
      }
    );
  }

}
