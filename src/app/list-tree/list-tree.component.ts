import { Component, OnInit } from '@angular/core';

import { ListItem } from '../models/list-item';

@Component({
  selector: 'app-list-tree',
  templateUrl: './list-tree.component.html',
  styleUrls: ['./list-tree.component.css']
})
export class ItemTreeComponent implements OnInit {

  data: ListItem[] = [
    { item: 'a', isChecked: false },
    { item: 'b', isChecked: false },
    { item: 'c', isChecked: true },
    { item: 'd', isChecked: false },
    { item: 'e', isChecked: false },
    { item: 'f', isChecked: false },
    { item: 'g', isChecked: true },
    { item: 'h', isChecked: false },
  ];

  constructor() {

  }

  ngOnInit() {
  }

  onClick(node: ListItem) {
    node.isChecked = !node.isChecked;
    // console.log(node);
  }
}
