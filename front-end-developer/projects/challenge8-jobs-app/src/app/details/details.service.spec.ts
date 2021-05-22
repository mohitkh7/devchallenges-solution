import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { DetailsService } from './details.service';

describe('DetailsService', () => {
  let service: DetailsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(DetailsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected job details (HttpClient called once)', () => {
    const response = {key: 'value'};
    const url = 'https://jobs.github.com/positions';
    service.getJobDetails('id').subscribe(
      resp => expect(resp).toEqual(response),
      error => {
        fail('assuming success response');
      }
    );
    const req = httpTestingController.expectOne(url + '/id.json');
    expect(req.request.method).toEqual('GET');
    req.flush(response);
  });
});
