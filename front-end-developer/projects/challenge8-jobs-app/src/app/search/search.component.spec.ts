import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { JobsService } from '../jobs.service';
import { MockJobsService } from '../jobs.service.mock';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let jobsService: JobsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ SearchComponent],
      providers: [{provide: JobsService, useClass: MockJobsService}]
    })
    .compileComponents();
    jobsService = TestBed.inject(JobsService);
    // spyOnProperty(jobsService, 'searchQuery', 'get').and.returnValue('dummy');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on initialization shouls fetch previous search query from service',  () => {
    expect(component.searchQuery).toBe('mockQuery');
  });

  it('onSearch should set service searchQuery', () => {
    const setSpy = spyOnProperty(jobsService, 'searchQuery', 'set');
    component.searchQuery = 'xyz';
    component.onSearch();
    expect(setSpy).toHaveBeenCalled();
  });

  it('onSearch should not set service searchQuery if both are same', () => {
    const setSpy = spyOnProperty(jobsService, 'searchQuery', 'set');
    component.searchQuery = 'mockQuery';
    component.onSearch();
    expect(setSpy).not.toHaveBeenCalled();
  });
});
