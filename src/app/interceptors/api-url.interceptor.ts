import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const url = `${environment.baseApiUrl}${req.url}`;
    const clonedReq = req.clone({url});
    console.log("req.clone({url})");
    console.log(url);
    return next.handle(clonedReq);
    
  }
}
