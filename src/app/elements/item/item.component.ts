import { Component, OnInit, Input } from '@angular/core';
import { Item } from './item.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item: Item;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
  }

  /**
   * Invoked on click.
   */
  onClick(): void {
    console.log(this.item);
  }
}
