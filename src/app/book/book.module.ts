import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';

import { ItemComponent } from './item/item.component';
import { BookComponent } from './book/book.component';
import { ListComponent } from './list/list.component';
import { BookMenuComponent } from './book-menu/book-menu.component';

@NgModule({
  declarations: [
    ListComponent,
    ItemComponent,
    BookComponent,
    BookMenuComponent,
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
