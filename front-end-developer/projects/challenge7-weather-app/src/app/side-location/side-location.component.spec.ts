import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideLocationComponent } from './side-location.component';

describe('SideLocationComponent', () => {
  let component: SideLocationComponent;
  let fixture: ComponentFixture<SideLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
