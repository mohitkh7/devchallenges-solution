import { HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CorsProxyInterceptor } from './cors-proxy.interceptor';

describe('CorsProxyInterceptor', () => {
  let interceptor: CorsProxyInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CorsProxyInterceptor ]
    });
    interceptor = TestBed.inject(CorsProxyInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should prefix CORS proxy url to request URL', (done) => {
    const url = 'http://abc.com';
    const next: any = {
      handle: (req: any) => {
        expect(req.url).toBe(interceptor.CORS_PROXY_URL + url, 'should prefix cors proxy url to request url');
        return of({abc: 'd'});
      }
    };
    const request = new HttpRequest<any>('GET', url);
    interceptor.intercept(request, next).subscribe(obj => done());
  });

  it('should parse "contents" as JSON from response body', (done) => {
    const jobList = ['job1', 'job2'];
    const responseBody = {contents: JSON.stringify(jobList)};
    const next: any = {
      handle: (req: any) => of(
        new HttpResponse({body: responseBody})
      )
    };
    const request = new HttpRequest<any>('GET', '/api/url');
    interceptor.intercept(request, next).subscribe((resp: any) => {
      expect(resp.body).toEqual(jobList, 'response body should be JSON parsed value of contents');
      done();
    });
  });
});
