import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ChartComponent } from './chart/chart.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,

    
  ],
  imports: [
    BrowserModule,
    HeaderComponent,
    ChartComponent,
    AppRoutingModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
