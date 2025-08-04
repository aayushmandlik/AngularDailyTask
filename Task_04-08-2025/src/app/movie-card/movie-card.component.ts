import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie:any

  constructor(private router: Router){}

  goToDetail(){
    this.router.navigate(['/movie',this.movie.id]);
  }
}
