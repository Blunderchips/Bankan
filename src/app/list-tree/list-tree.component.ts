import { Component, OnInit } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ArrayDataSource } from '@angular/cdk/collections';

import { ListItem } from '../models/list-item';

const TREE_DATA: ListItem[] = [
  {
    item: 'Fruit',
    isChecked: true,
    children: [
      { item: 'Apple', isChecked: false },
      { item: 'Banana', isChecked: false },
      {
        item: 'Fruit loops',
        isChecked: false,
        children: [
          { item: 'Broccoli', isChecked: false },
          { item: 'Brussel sprouts', isChecked: false }
        ]
      },
    ]
  }, {
    item: 'Vegetables',
    isChecked: false,
    children: [
      {
        item: 'Green',
        isChecked: false,
        children: [
          { item: 'Broccoli', isChecked: false },
          { item: 'Brussel sprouts', isChecked: false }
        ]
      }, {
        item: 'Orange',
        isChecked: false,
        children: [
          { item: 'Pumpkins', isChecked: false },
          { item: 'Carrots', isChecked: false, children: [] }
        ]
      },
    ]
  },
];

@Component({
  selector: 'app-list-tree',
  templateUrl: './list-tree.component.html',
  styleUrls: ['./list-tree.component.css']
})
export class ItemTreeComponent implements OnInit {

  treeControl = new NestedTreeControl<ListItem>(node => node.children);
  dataSource = new ArrayDataSource(TREE_DATA);

  constructor() { }

  ngOnInit() {
  }

  hasChild = (_: number, node: ListItem) => {
    return !!node.children && node.children.length > 0;
  }
}
