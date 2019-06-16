import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';

import { BookMenuComponent } from './book-menu.component';

describe('BookMenuComponent', () => {
  let component: BookMenuComponent;
  let fixture: ComponentFixture<BookMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        BookMenuComponent
      ],
      imports: [
        MatMenuModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
