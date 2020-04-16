import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BaseService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public post(apiURL: string, payload: any = {}): Promise<any> {

/*
    this.http.post(apiURL, payload, {responseType: 'text'})
      .subscribe(
      (val) => {console.log("1. POST call successful value returned in body",val);},
      response => {console.log("2. POST call in error", response);},
      () => {console.log("3. The POST observable is now completed.");});
*/



    return this.http.post(apiURL, payload, {responseType: 'text'}).toPromise();
  }
}
