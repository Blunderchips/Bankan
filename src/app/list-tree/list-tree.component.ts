import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export class n {
  uid: string;
  item: string;
}

@Component({
  selector: 'app-list-tree',
  templateUrl: './list-tree.component.html',
  styleUrls: ['./list-tree.component.css']
})
export class ItemTreeComponent implements OnInit {

  // @Input() list: List;

  items: n[];

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    // this.items = this.afs.doc('list_items/' + this.list.uid).valueChanges().forEach(item => {
    //   console.log(item);
    // });
    // console.log(this.items);
    // this.items = this.afs.doc<n[]>('list_items/' + this.list.uid).valueChanges();
    // this.items.subscribe(items => {
    //   items.forEach(i => {
    //     console.log(i);
    //   });
    // });
  }

  add() {
    // this.items.subscribe(items => {
    const _item = window.prompt('enter name');
    if (!_item) {
      return;
    }

    const uid = this.afs.createId();
    // const list = this.list.uid;

    // this.items.push({
    //   uid,
    //   item
    // });

    // this.afs.collection('test').doc(this.list.uid).collection<any>('items').add({ item: _item });
    // });
  }
}
