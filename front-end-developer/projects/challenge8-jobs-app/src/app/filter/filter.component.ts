import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { JobsService } from '../jobs.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  locationText = new FormControl('');
  locationRadio =  new FormControl('');
  fullTimeCheck = new FormControl(false);
  frequentLocations = ['Remote', 'Amsterdam', 'Berlin', 'Cologne', 'Schwerin'];

  constructor(
    private jobsService: JobsService,
  ) { }

  ngOnInit(): void {
    this.watchLocationText();
    this.watchLocationRadio();
    this.watchFullTimeCheck();
  }

  watchLocationText(): void {
    this.locationText.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      if (value !== null) {
        this.onLocationTextChange(value);
      }
    });
  }

  onLocationTextChange(value: string): void {
    this.locationRadio.setValue(null);
    this.jobsService.location = value;
  }

  watchLocationRadio(): void {
    this.locationRadio.valueChanges.subscribe((value: string) => {
      if (value !== null) {
        this.onLocationRadioChange(value);
      }
    });
  }

  onLocationRadioChange(value: string): void {
    this.locationText.setValue(null);
    this.jobsService.location = value;
  }

  watchFullTimeCheck(): void {
    this.fullTimeCheck.valueChanges.subscribe((value: boolean) => {
      this.onFullTimeCheckChange(value);
    });
  }

  onFullTimeCheckChange(value: boolean): void {
    this.jobsService.showOnlyFullTimeJobs = value;
  }
}
