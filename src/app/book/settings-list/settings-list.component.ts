import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

import { List } from '../models/list.model';
import { Item } from '../models/item.model';
import { Check } from '../models/check.model';

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.scss']
})
export class SettingsListComponent implements OnInit {

  @Input() list: List;

  edit = {};
  editing = {};

  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.items = this.afs.collection<Item>(this.list.uid).valueChanges();
  }

  toggleEdit(item: Item) {
    this.editing[item.uid] = !this.editing[item.uid];
    this.edit[item.uid] = item.item;
  }

  save(item: Item) {
    const input = this.edit[item.uid];
    if (!input || input.trim().length === 0) {
      this.toggleEdit(item);
      console.log('No edit');
      return;
    }

    item.item = input.trim();
    this.afs.collection<Item>(this.list.uid).doc(item.uid).update(item);

    this.toggleEdit(item);
  }

  delete(item: Item) {
    // TODO Confirmation dialogue
    if (true) {

      const itemDBRef = this.afs.collection<Check>(item.uid);
      itemDBRef.valueChanges({ idField: 'uid' }).subscribe(checks => {
        checks.forEach(check => {
          itemDBRef.doc(check.uid).delete();
        });
      });

      this.afs.collection<Item>(this.list.uid).doc(item.uid).delete();
    }
  }

  isEditing(item: Item): boolean {
    return this.editing[item.uid];
  }
}
