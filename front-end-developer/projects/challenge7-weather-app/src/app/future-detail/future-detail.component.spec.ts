import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureDetailComponent } from './future-detail.component';

describe('FutureDetailComponent', () => {
  let component: FutureDetailComponent;
  let fixture: ComponentFixture<FutureDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
