import { productsReducer, usersReducer } from './store/reducers';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableComponent } from './mat-table/mat-table.component';
import {MatTableModule} from '@angular/material/table'
import { SharedModule } from './shared/shared.module';
import { UsersComponent } from './users/users.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UsersEffect } from './store/effects';
import { UsersService } from './users.service';
import { environment } from './environments/environment';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    SharedModule,
    StoreModule.forFeature('users',usersReducer),
    StoreModule.forFeature('products',productsReducer),
    EffectsModule.forFeature([UsersEffect]),
    EffectsModule.forFeature([UsersEffect])
  ],
  providers: [HttpClient,UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
