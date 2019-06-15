import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { Check } from '../models/check.model';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-check-log',
  templateUrl: './check-log.component.html',
  styleUrls: ['./check-log.component.css']
})
export class CheckLogComponent implements OnInit, AfterViewInit {

  @Input() listUid: string;

  checkLog = new Set<Check>();
  displayedColumns: string[] = ['weight', 'position', 'name', 'symbol'];
  dataSource = new MatTableDataSource<Check>();
  /**
   * Refereence to paginator.
   */
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    console.log(this.listUid);
    this.afs.collection<Item>(this.listUid).valueChanges().subscribe(items => {
      items.forEach(item => {
        this.afs.collection<Check>(item.uid).valueChanges().subscribe(checks => {
          checks.forEach(check => {
            this.checkLog.add(check);
            this.dataSource.data = Array.from(this.checkLog.values());
          });
        });
      });
    });
  }

  ngAfterViewInit() {
    // https://stackoverflow.com/a/50508636/3833743
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Filter check log history table.
   * 
   * @param filterValue value to search for
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
