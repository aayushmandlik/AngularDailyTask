import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(movies:any[], query: string): any[] {
    if(!query) return movies
    return movies.filter(movie => movie.name.toLowerCase().includes(query.toLowerCase()))
  }

}
