import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { BK_TOAST_MESSAFE_CONFIG } from 'src/app/Bankan';

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

  constructor(
    private afs: AngularFirestore,
    private toastr: ToastrService
  ) {
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
    this.toastr.success('Item added successfully', `${item} was added to the list`, BK_TOAST_MESSAFE_CONFIG);
  }

  /**
   * @returns uid of the list.
   */
  getUid(): string {
    return this.list.uid;
  }
}
