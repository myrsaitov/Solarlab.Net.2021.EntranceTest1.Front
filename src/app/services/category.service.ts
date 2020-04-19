import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {ICategory} from '../models/category/category-model';
import {ICategoryFilter} from '../models/category/category-filter.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private ROOT_URL = `api/v1/category`;

  constructor(private http: HttpClient) {
  }

  getCategoryList(filter: ICategoryFilter) {
    const {page, pageSize} = filter;
    if (page == null || pageSize == null) {
      return;
    }

    const params = new HttpParams()
      .set('page', `${page}`)
      .set('pageSize', `${pageSize}`);
      
      //debugger;
    return this.http.get<ICategory[]>(`${this.ROOT_URL}/list`, {params})
      .pipe(catchError((err) => {
        console.error(err);
        return EMPTY;
      }));
  }



  getCategoryById(id: number) {

    return this.http.get<ICategory>(`${this.ROOT_URL}/${id}`)
      .pipe(catchError((err) => {
        console.error(err);
        return EMPTY;
      }));
      
  }





}
