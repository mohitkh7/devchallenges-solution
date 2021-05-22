import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CorsProxyInterceptor implements HttpInterceptor {
  readonly CORS_PROXY_URL = 'https://api.allorigins.win/get?url=';

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const corsReq = request.clone({
      url: this.CORS_PROXY_URL + request.url
    });
    return next.handle(corsReq).pipe(
      map(event => this.parseCorsResponse(event)));
  }

  private parseCorsResponse(event: HttpEvent<any>): HttpEvent<any> {
    if (event instanceof HttpResponse) {
      return event.clone({body: JSON.parse(event.body.contents)});
    } else {
      return event;
    }
  }
}
