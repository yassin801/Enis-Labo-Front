import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
import {Injectable} from '@angular/core';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone(
      { headers:
          req.headers.set('Content-Type', 'application/json') });
    let authReq = req;
    const token = localStorage.getItem('token');
    console.log("token: "+token);
    if (token != null) {
      authReq = req.clone({ headers:
          req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
];
