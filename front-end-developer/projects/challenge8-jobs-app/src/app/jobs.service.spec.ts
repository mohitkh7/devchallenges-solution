import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { JobsService, STATE } from './jobs.service';

describe('JobsService', () => {
  let service: JobsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(JobsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('fetchJobs', () => {
    const url = 'https://jobs.github.com/positions.json?';

    it('should return response with success state when jobs are available', () => {
      const response = ['job1', 'job2'];
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(response);
      expect(service.jobsSubject$.value).toEqual({
        state: STATE.SUCCESS,
        data: ['job1', 'job2']
      });
    });

    it('should return response with empty state when no jobs are available', () => {
      const response: any[] = [];
      const req = httpTestingController.expectOne(url);
      expect(req.request.method).toEqual('GET');
      req.flush(response);
      expect(service.jobsSubject$.value).toEqual({
        state: STATE.EMPTY,
        data: []
      });
    });

    it('should return response with error state when http request fails', () => {
      const mockError = new ErrorEvent('stimulated network error', {
        message: 'no network'
      });
      const req = httpTestingController.expectOne(url);
      req.error(mockError);
      expect(service.jobsSubject$.value).toEqual({
        state: STATE.ERROR,
        data: []
      });
    });
  });

  it('getJobs should return loading state initially', () => {
    service.getJobs().subscribe(
      (data) => expect(data.state).toBe(STATE.LOADING, 'expects loading state'),
      (error) => fail('expects successful response with loading state')
    );
  });

  it('should fetch jobs on change of #searchQuery', () => {
    spyOn(service, 'fetchJobs');
    service.searchQuery = 'randomSearchQuery';
    expect(service.fetchJobs).toHaveBeenCalled();
  });

  it('should get #searchQuery', () => {
    const query = 'randomSearchQuery';
    service.searchQuery = query;
    expect(service.searchQuery).toBe(query);
  });

  it('should fetch jobs on change of #showOnlyFullTimeJobs', () => {
    spyOn(service, 'fetchJobs');
    service.showOnlyFullTimeJobs = true;
    expect(service.fetchJobs).toHaveBeenCalled();
  });

  it('should get #showOnlyFullTimeJobs', () => {
    service.showOnlyFullTimeJobs = true;
    expect(service.showOnlyFullTimeJobs).toBeTrue();
  });

  it('should fetch jobs on change of #location', () => {
    spyOn(service, 'fetchJobs');
    service.location = 'randomLocation';
    expect(service.fetchJobs).toHaveBeenCalled();
  });

  it('should get #location', () => {
    const location = 'randomLocation';
    service.location = location;
    expect(service.location).toBe(location);
  });
});
