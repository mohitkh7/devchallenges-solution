import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideDetailComponent } from './side-detail.component';

describe('SideDetailComponent', () => {
  let component: SideDetailComponent;
  let fixture: ComponentFixture<SideDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
