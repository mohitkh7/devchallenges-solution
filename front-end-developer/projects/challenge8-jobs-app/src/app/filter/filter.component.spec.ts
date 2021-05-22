import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { JobsService } from '../jobs.service';
import { MockJobsService } from '../jobs.service.mock';

import { FilterComponent } from './filter.component';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let jobsService: JobsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ FilterComponent ],
      providers: [{ provide: JobsService, useClass: MockJobsService }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    jobsService = TestBed.inject(JobsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changing full time checkbox should set jobService showOnlyFullTimeJobs', () => {
    component.fullTimeCheck.setValue(true);
    expect(jobsService.showOnlyFullTimeJobs).toBeTrue();
  });

  it('changing location text input should set jobService location', fakeAsync(() => {
    component.locationText.setValue('locationText');
    tick(600);
    expect(jobsService.location).toBe('locationText');
  }));

  it('clearing location text input should not change jobService location', fakeAsync(() => {
    component.locationText.setValue(null);
    tick(600);
    expect(jobsService.location).toBe('mockLocation');
  }));

  it('selecting location radio input should set jobService location', () => {
    component.locationRadio.setValue('radioOption');
    expect(jobsService.location).toBe('radioOption');
  });

  it('clearing location radio input should not set jobService location', () => {
    component.locationRadio.setValue(null);
    expect(jobsService.location).toBe('mockLocation');
  });
});
