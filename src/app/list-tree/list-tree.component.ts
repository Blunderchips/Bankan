import { Component, OnInit, Input } from '@angular/core';
import { List } from '../models/List.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { ListItem, LIST_ITEMS_TABLE } from '../models/list-item.model';

@Component({
  selector: 'app-list-tree',
  templateUrl: './list-tree.component.html',
  styleUrls: ['./list-tree.component.css']
})
export class ItemTreeComponent implements OnInit {

  @Input() list: List;

  items: any;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.items = this.afs.collection(LIST_ITEMS_TABLE,
      ref => ref.where('list', '==', this.list.uid)).valueChanges();
  }

  add() {
    const item = window.prompt('enter name');
    if (!item) {
      return;
    }

    const uid = this.afs.createId();
    const list = this.list.uid;

    this.afs.collection<ListItem>(LIST_ITEMS_TABLE).doc(uid).set(
      {
        uid,
        list,
        item
      }
    );
  }
}
