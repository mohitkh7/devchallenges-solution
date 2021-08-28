import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Breed } from '../app.models';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService,
    private router: Router,
    private titleService: Title) { }

  breedList: Breed[] = [];

  ngOnInit(): void {
    this.getBreedList();
    this.titleService.setTitle('Cat-Wiki');
  }

  getBreedList() {
    this.homeService.getBreedList()
      .subscribe((lst: any) => {
        this.breedList = lst;
      })
  }

  keyword = 'name';
  selectEvent(item: Breed) {
    const detailUrl = 'detail/' + item.name;
    this.router.navigateByUrl(detailUrl);
  }
}

