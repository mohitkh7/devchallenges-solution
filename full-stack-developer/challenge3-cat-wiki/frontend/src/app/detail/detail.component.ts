import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BreedDetail, Image } from '../app.models';
import { DetailService } from './detail.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(
    private detailService: DetailService,
    private route: ActivatedRoute,
    private titleService: Title) { }

  breedName!: string;
  errorMsg!: string;

  ngOnInit(): void {
    this.breedName = this.route.snapshot.paramMap.get('name')!;
    this.titleService.setTitle(`Cat-Wiki ${this.breedName} Details`);
    this.getDetails(this.breedName);
  }

  breedDetail!: BreedDetail;
  isBreedDetailLoading = true;
  getDetails(breedName: string) {
    this.detailService.getBreedDetail(breedName)
      .subscribe((data: BreedDetail) => {
        this.isBreedDetailLoading = false;
        this.getImages(data.id);
        this.breedDetail = data;
      }, (error: HttpErrorResponse) => {
        this.isBreedDetailLoading = false;
        this.errorMsg = error.error.message;
      });
  }

  imageList$!: Observable<Image>;
  getImages(breedId: string) {
    this.imageList$ = this.detailService.getBreedImages(breedId);
  }

}

