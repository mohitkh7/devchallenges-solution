import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable, of, throwError } from 'rxjs';
import { JobsService, STATE } from '../jobs.service';

import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let mockJobsService: any;

  beforeEach(async () => {
    mockJobsService = {
      getJobs: () => of({state: STATE.EMPTY, data: []} as any)
    };
    await TestBed.configureTestingModule({
      imports: [NgxPaginationModule],
      declarations: [ ListComponent ],
      providers: [{ provide: JobsService, useValue: mockJobsService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getJobs should set state and jobsList based on service.getJobs response', () => {
    spyOn(mockJobsService, 'getJobs').and.returnValue(of({state: STATE.EMPTY, data: []}));
    component.getJobs();
    expect(component.state).toBe(STATE.EMPTY, 'Expected state to be empty');
    expect(component.jobsList).toEqual([]);
  });

  it('getJobs should set error state when observable fails', () => {
    spyOn(mockJobsService, 'getJobs').and.returnValue(throwError('error'));
    component.getJobs();
    expect(component.state).toBe(STATE.ERROR);
  });
});
