import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(movieees:any[], query: string): any[] {
    if(!query) return movieees
    return movieees.filter(movie => movie.name.toLowerCase().includes(query.toLowerCase()))
  }

}
