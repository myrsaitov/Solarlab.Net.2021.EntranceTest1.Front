import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class BaseService {

  constructor(
    private readonly http: HttpClient,
  ) { }

  public post(apiURL: string, payload: any = {}): Promise<any> {
    return this.http.post(apiURL, payload).toPromise();
  }
}
