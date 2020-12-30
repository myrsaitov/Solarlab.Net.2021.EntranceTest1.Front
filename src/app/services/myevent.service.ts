import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {EMPTY, Observable} from 'rxjs';
import {GetPagedMyEventModel} from '../models/myevent/get-paged-myevent-model';
import {IMyEvent} from '../models/myevent/i-myevent';
import {ICreateMyEvent} from '../models/myevent/myevent-create-model';
import {IEditMyEvent} from '../models/myevent/myevent-edit-model';

@Injectable({
  providedIn: 'root'
})
export class MyEventService {
  private ROOT_URL = `api/v1/MyEvent`;

  constructor(private http: HttpClient) {
  }

  getMyEventsList(model: GetPagedMyEventModel): Observable<IMyEvent[]> {
    const {page, pageSize} = model;
    if (page == null || pageSize == null) {
      return;
    }

    const params = new HttpParams()
      .set('page', `${page}`)
      .set('pageSize', `${pageSize}`);

    return this.http.get<IMyEvent[]>(`${this.ROOT_URL}/list`, {params})
      .pipe(catchError((err) => {
        console.error(err);
        return EMPTY;
      }));
  }

  getMyEventsTagList(id: number): Observable<IMyEvent[]> {


    const params = new HttpParams()
      .set('page', `${1}`)
      .set('pageSize', `${10}`)
      .set('TagId', `${id}`)

    return this.http.get<IMyEvent[]>(`${this.ROOT_URL}/taglist`, {params})
      .pipe(catchError((err) => {
        console.error(err);
        return EMPTY;
      }));
  }

  getMyEventById(id: number) {

    return this.http.get<IMyEvent>(`${this.ROOT_URL}/${id}`)
      .pipe(catchError((err) => {
        console.error(err);
        return EMPTY;
      }));
      
  }

  getMyEventGetAllTags() {

    return this.http.get<IMyEvent>(`${this.ROOT_URL}/GetAllTags`)
      .pipe(catchError((err) => {
        console.error(err);
        return EMPTY;
      }));
      
  }

  create(model: ICreateMyEvent) {
    return this.http.post(`${this.ROOT_URL}`, model)
      .pipe(catchError((err) => {
        console.error(err);
        return EMPTY;
      }));
  }

  edit(model: IEditMyEvent) {
    return this.http.put(`${this.ROOT_URL}`, model)
      .pipe(catchError((err) => {
        console.error(err);
        return EMPTY;
      }));
  }

  delete(id: number) {
    return this.http.delete<IMyEvent>(`${this.ROOT_URL}/${id}`)
      .pipe(catchError((err) => {
        console.error(err);
        return EMPTY;
      }));
  }
}


