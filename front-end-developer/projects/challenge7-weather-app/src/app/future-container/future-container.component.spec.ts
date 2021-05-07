import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutureContainerComponent } from './future-container.component';

describe('FutureContainerComponent', () => {
  let component: FutureContainerComponent;
  let fixture: ComponentFixture<FutureContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FutureContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FutureContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
