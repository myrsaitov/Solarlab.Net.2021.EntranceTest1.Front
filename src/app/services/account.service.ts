import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IRegister} from '../models/account/register.model';
import {catchError} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private ROOT_URL = `api/v1/account`;
  constructor(private http: HttpClient) { }

  register(model: IRegister) {
    return this.http.post(`${this.ROOT_URL}/register`, model).pipe(catchError((error) => {
      console.error(error);
      return EMPTY;
    }));
 

  }

  account() {
    return this.http.get(`${this.ROOT_URL}`).pipe(catchError((error) => {
      console.error(error);
      return EMPTY;
    }));
  }
}
