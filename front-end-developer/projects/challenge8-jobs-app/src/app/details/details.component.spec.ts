import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of, throwError } from 'rxjs';
import { DaysAgoPipe } from '../days-ago.pipe';

import { DetailsComponent } from './details.component';
import { DetailsService } from './details.service';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let detailsServiceSpy = {
    getJobDetails: () => {
      return of({});
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule],
      declarations: [ DetailsComponent, DaysAgoPipe ],
      providers: [{ provide: DetailsService, useValue: detailsServiceSpy }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getJobDetails should fetch and set job details on success response', () => {
    spyOn(detailsServiceSpy, 'getJobDetails').and.returnValue(of({key: 'value'}));
    component.getJobDetails('jobId');
    expect(component.job).toEqual({key: 'value'});
  });

  it('getJobDetails should display error on error response', () => {
    spyOn(detailsServiceSpy, 'getJobDetails').and.returnValue(throwError('error'));
    component.getJobDetails('jobId');
    expect(component.isError).toEqual(true);
  });
});
