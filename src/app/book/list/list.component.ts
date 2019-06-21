import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { List } from '../models/list.model';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() list: List;

  private items: Observable<Item[]>;

  //
  newListItem: string;
  //

  constructor(private afs: AngularFirestore) {
    this.newListItem = '';
  }

  ngOnInit() {
    this.items = this.afs.collection<Item>(this.list.uid).valueChanges();
  }

  addNewItem(): void {
    const item = this.newListItem.trim();
    if (!item || item.length === 0) {
      return;
    }

    const uid = this.afs.createId();

    this.afs.collection<Item>(this.list.uid).doc(uid).set({
      item,
      uid
    });

    this.newListItem = ''; // clear input field once done
  }

  /**
   * @returns uid of the list.
   */
  getUid(): string {
    return this.list.uid;
  }
}

