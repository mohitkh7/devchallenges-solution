import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from './details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  job: any = null;
  isError = false;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private detailsService: DetailsService
  ) { }

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    this.getJobDetails(jobId);
  }

  getJobDetails(jobId: string | null): void {
    this.isError = false;
    this.isLoading = true;
    this.detailsService.getJobDetails(jobId).subscribe(data => {
      this.job = data;
    }, (error) => {
      this.isError = true;
      console.error(error);
    }).add(() => {
      // regardless of observable pass or fails this block will execute
      this.isLoading = false;
    });
  }
}
