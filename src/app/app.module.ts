import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScriptDirective } from './shared/directives/script.directive';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    ScriptDirective,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
