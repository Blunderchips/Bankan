import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { List } from '../models/list.model';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() list: List;

  private items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.items = this.afs.collection<Item>(this.list.uid).valueChanges();
  }

  addItem(): void {
    const item = window.prompt('Item').trim();
    if (!item) {
      return;
    }

    const uid = this.afs.createId();

    this.afs.collection<Item>(this.list.uid).doc(uid).set({
      item,
      uid
    });
  }
}
