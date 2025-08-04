import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: any[] = []
constructor(private movieService: MovieService){}

ngOnInit(): void {
  this.movieService.fetchMovies();
  this.movieService.movies$.subscribe((data)=>{
    this.movies = data.slice(0,15)
  })
}
}
