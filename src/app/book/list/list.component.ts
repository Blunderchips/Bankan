import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

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

  //
  newListItem: string;
  //

  constructor(
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private cookie: CookieService,
  ) {
    this.newListItem = '';
  }

  ngOnInit() {
  }

  addNewItem(): void {
    const item = this.newListItem.trim();
    if (!item || item.length === 0) {
      return;
    }

    const uid = this.afs.createId();

    if (!this.list.items) {
      this.list.items = [];
    }
    this.list.items.push({
      item,
      uid
    });
    this.afs.collection(this.list.parent).doc(this.list.uid).update(this.list);

    this.newListItem = ''; // clear input field once done
    this.toastr.success('Item added successfully', `${item} was added to the list`, BK_TOAST_MESSAFE_CONFIG);
  }

  /**
   * @returns uid of the list.
   */
  getUid(): string {
    return this.list.uid;
  }

  /**
   * @returns active list
   */
  getList(): List {
    return this.list;
  }

  getItems(): Item[] {
    return this.list.items;
  }

  isExpansionPanelOpen(): boolean {
    const state = this.cookie.get(`${this.list.uid}_isOpen`);
    if (!state || state !== 'true') {
      return false;
    } else {
      return true;
    }
  }

  setExpansionPanelState(isOpen: boolean): void {
    this.cookie.set(`${this.list.uid}_isOpen`, isOpen + '');
  }

  setSelectedTab($openTabIndex: number): void {
    this.cookie.set(`${this.list.uid}_openTabIndex`, $openTabIndex + '');
  }

  getSelectedTab(): number {
    const state = this.cookie.get(`${this.list.uid}_openTabIndex`);
    if (!state) {
      return 0;
    } else {
      return parseInt(state, 10);
    }
  }
}
