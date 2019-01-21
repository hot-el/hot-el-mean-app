import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.firstName.toLocaleLowerCase().includes(searchText) || it.lastName.toLocaleLowerCase().includes(searchText)
      || it.roles[0].toLocaleLowerCase().includes(searchText);
    });
  }

}
