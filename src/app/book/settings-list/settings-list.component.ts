import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

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

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
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

    const i = this.list.items.indexOf(item);
    item.item = input.trim();
    this.list.items[i] = item;

    this.update();

    // // panel gets destroyed when updating so there is no need to exit mode.
    // this.toggleEdit(item);
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

      const index = this.list.items.indexOf(item);
      if (index > -1) {
        this.list.items.splice(index, 1);
      }
      this.update();
    }
  }

  isEditing(item: Item): boolean {
    return this.editing[item.uid];
  }

  getItems(): Item[] {
    return this.list.items;
  }

  update() {
    this.afs.collection(this.list.parent).doc(this.list.uid).update(this.list);
  }
}
