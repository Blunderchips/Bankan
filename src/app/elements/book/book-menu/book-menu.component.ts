import { Component, OnInit, Input } from '@angular/core';
import { BookComponent } from '../book.component';

@Component({
  selector: 'app-book-menu',
  templateUrl: './book-menu.component.html',
  styleUrls: ['./book-menu.component.css']
})
export class BookMenuComponent implements OnInit {

  /**
   * Parent componet.
   */
  @Input() parent: BookComponent;

  constructor() { }

  ngOnInit() {
  }

}
