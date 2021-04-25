import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindbnbComponent } from './windbnb.component';

describe('WindbnbComponent', () => {
  let component: WindbnbComponent;
  let fixture: ComponentFixture<WindbnbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindbnbComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindbnbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
