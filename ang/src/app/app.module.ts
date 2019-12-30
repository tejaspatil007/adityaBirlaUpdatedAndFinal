import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AdityabirlaComponent } from './adityabirla/adityabirla.component';

import { RouterModule } from '@angular/router'
import { routes } from './app.routes';
import { CalculatorgoalComponent } from './calculatorgoal/calculatorgoal.component';
import { SelectgoalsComponent } from './selectgoals/selectgoals.component';
import { GoalsComponent } from './goals/goals.component';
import { TermgoalsComponent } from './termgoals/termgoals.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AdityabirlaComponent,
    CalculatorgoalComponent,
    SelectgoalsComponent,
    GoalsComponent,
    TermgoalsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [GoalsComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
