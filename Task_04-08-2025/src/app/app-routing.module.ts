import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'movies', component: MovieListComponent, canActivate: [authGuard]},
  {path: 'movie/:id', component: MovieDetailComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
