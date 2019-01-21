import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Category } from '../_models/category';

@Injectable()
export class CategoriesService {

  constructor(private http: Http) {}

  getCategories(): Promise<Category[]> {
    return this.http.get('../../assets/categories.json')
    .toPromise()
    .then(res => res.json() as Category[]);
  }

  getCategoryBySlug(slug: string) {
    return this.getCategories()
    .then(categories => {
      return categories.find((category) => {
        return category.slug === slug;
      });
    });
  }
}
