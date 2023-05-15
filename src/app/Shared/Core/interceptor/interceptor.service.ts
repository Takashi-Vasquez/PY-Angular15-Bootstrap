import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptService implements HttpInterceptor {

  constructor() { }

  private static addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setParams: {
        "nombres": "Hugo Takashi"
      },
      setHeaders: {
        'token-usuario': token,
      }
    });
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = this.sessionService.getCurrentToken();
    const token = 'A$FS15215AAS8412124321';
    if (token) {
      req = InterceptService.addToken(req, token);
    }
    console.log("paso por interceptor");

    return next.handle(req);
  }
}
