import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MultipleQuoteComponent } from './multiple-quote/multiple-quote.component';
import { SingleQuoteComponent } from './single-quote/single-quote.component';

const routes: Routes = [
  { path: 'quote', component: SingleQuoteComponent },
  { path: 'quote/:author', component: MultipleQuoteComponent },
  { path: '**', redirectTo: '/quote', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
