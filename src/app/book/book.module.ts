import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';

import { ItemComponent } from './item/item.component';
import { BookComponent } from './book/book.component';
import { ListComponent } from './list/list.component';
import { BookMenuComponent } from './book-menu/book-menu.component';
import { CheckLogComponent } from './check-log/check-log.component';

@NgModule({
  declarations: [
    ListComponent,
    ItemComponent,
    BookComponent,
    BookMenuComponent,
    CheckLogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    BookComponent,
  ]
})
export class BookModule { }
