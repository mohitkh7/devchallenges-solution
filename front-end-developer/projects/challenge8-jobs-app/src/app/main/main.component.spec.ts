import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';

@Component({
  selector: 'app-filter',
  template: '<p>filter component works</p>',
})
class MockFilterComponent{}

@Component({
  selector: 'app-list',
  template: '<p>list component works</p>',
})
class MockListComponent{}

@Component({
  selector: 'app-search',
  template: '<p>search component works</p>',
})
class MockSearchComponent{}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent, MockFilterComponent, MockListComponent, MockSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
