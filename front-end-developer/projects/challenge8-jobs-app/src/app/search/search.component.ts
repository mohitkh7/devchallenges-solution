import { Component, OnInit } from '@angular/core';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery = '';

  constructor(
    private jobService: JobsService
  ) { }

  ngOnInit(): void {
    this.searchQuery = this.jobService.searchQuery;
  }

  onSearch(): void {
    // update and call API only when there is a change
    if (this.jobService.searchQuery !== this.searchQuery) {
      this.jobService.searchQuery = this.searchQuery;
    }
  }

}
