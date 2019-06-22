import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '../material.module';
import { ToastrModule } from 'ngx-toastr';

import { BK_TOASTER_CONFIG } from '../Bankan';

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
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(BK_TOASTER_CONFIG) // ToastrModule added
  ],
  exports: [
    BookComponent,
  ]
})
export class BookModule { }
