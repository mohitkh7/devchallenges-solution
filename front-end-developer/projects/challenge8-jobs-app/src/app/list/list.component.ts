import { Component, OnInit } from '@angular/core';
import { JobsList, JobsService, STATE } from '../jobs.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  STATE = STATE;
  state: STATE = STATE.LOADING;
  pageIndex = 1;
  jobsList: any[] = [];

  constructor(private jobsService: JobsService) { }

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs(): void {
    this.jobsService.getJobs().subscribe((response: JobsList) => {
      this.state = response.state;
      this.jobsList = response.data;
      this.pageIndex = 1;
    }, (error) => {
      console.error(error);
      this.state = STATE.ERROR;
    });
  }
}
