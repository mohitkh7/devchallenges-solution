import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from '../home/home.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private homeService: HomeService,
    private titleService: Title) { }
  
  breeds$!: Observable<any>;
  ngOnInit(): void {
    this.breeds$ = this.homeService.getBreedList();
    this.titleService.setTitle('Cat-Wiki breeds list');
  }

  // pagination
  itemPerPage = 10;
  pageIndex = 1;

  changePage(page: number): void {
    this.pageIndex = page;
    window.scrollTo(0, 0);
  }

}
