import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from './movie.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HoverShadowDirective } from './hover-shadow.directive';
import {MatPaginatorModule} from '@angular/material/paginator';
import { SearchPipe } from './search.pipe'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MovieListComponent,
    MovieDetailComponent,
    MovieCardComponent,
    HoverShadowDirective,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,MatInputModule,MatCardModule,MatButtonModule,HttpClientModule,MatToolbarModule,MatIconModule,MatPaginatorModule
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
