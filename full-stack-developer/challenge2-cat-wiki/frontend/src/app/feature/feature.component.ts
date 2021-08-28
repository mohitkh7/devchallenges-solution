import { Component, Input, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
  
  @Input() feature_name!: string;
  @Input() feature_value!: number;

  fill_bars!: number[];
  empty_bars!: number[];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    // when feature_value changes with positive value
    if (changes.feature_value && changes.feature_value.currentValue){
      this.fill_bars = Array(this.feature_value).fill(null);
      this.empty_bars = Array(5 - (this.feature_value || 0)).fill(null);
    }
  }
}

