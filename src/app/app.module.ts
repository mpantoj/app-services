import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AutosComponent } from './autos/autos.component';
import { BasicService } from './services/basic.service';


@NgModule({
  declarations: [
    AppComponent,
    AutosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [BasicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
