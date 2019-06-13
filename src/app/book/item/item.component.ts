import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

import { Item } from '../models/item.model';
import { Check } from '../models/check.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item: Item;

  /**
   * Current state of the item.
   */
  public isChecked: boolean; // Matt(2019/06/06):Needs to be public

  constructor(
    private afs: AngularFirestore,
    private auth: AngularFireAuth
  ) {
    this.isChecked = false; // Assume unchecked on start up
  }

  ngOnInit() {
    this.afs.collection<Check>(this.item.uid,
      ref => ref.orderBy('timestamp', 'desc').limit(1)
    ).valueChanges().subscribe(checks => {
      checks.forEach(i => { // just to be safe, should only run once
        this.isChecked = i.isChecked;
      });
    });
  }

  /**
   * Invoked on click.
   */
  onClick(): void {
    this.isChecked = !this.isChecked;
    const check = this.isChecked;

    this.auth.user.subscribe(user => {
      const uid = this.afs.createId();
      this.afs.collection(this.item.uid).doc<Check>(uid).set({
        timestamp: new Date(),
        isChecked: check,
        user: user.uid
      });
    });
  }
}
