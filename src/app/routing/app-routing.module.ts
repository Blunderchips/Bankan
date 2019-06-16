import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ROUTES } from './app.routes';


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(ROUTES, { useHash: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
