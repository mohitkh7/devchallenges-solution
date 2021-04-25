import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-windbnb',
  templateUrl: './windbnb.component.html',
  styleUrls: ['./windbnb.component.css']
})
export class WindbnbComponent implements OnInit {
  stays: any[] = [];
  filteredStays: any[] = [];
  isOverlayVisible = false;
  guestCount = {
    adults: 0,
    children: 0
  };
  locationList: string[] = [];
  selectedLocation = '';
  activeFilterInput: ''|'L'|'G' = '';

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getStayDetail();
  }

  getStayDetail(): void {
    this.http.get('assets/stays.json').subscribe(
      (data: any) => {
        this.stays = data;
        this.filteredStays = this.stays;
        this.retrieveAllLocations();
      },
      (error) => console.error(error),
      () => console.log(this.stays)
    );
  }

  retrieveAllLocations(): void {
    this.stays.forEach(stay => {
      const currLocation = this.getLocation(stay);
      if (this.locationList.indexOf(currLocation) === -1) {
        this.locationList.push(currLocation);
      }
    });
  }

  toggleOverlay(): void {
    this.updateActiveFilterInput('');
    this.isOverlayVisible = !this.isOverlayVisible;
  }

  updateGuestCount(guestType: 'adults' | 'children', value: number): void {
    this.guestCount[guestType] += value;
    if (this.guestCount[guestType] < 0) {
      this.guestCount[guestType] = 0;
    }
  }

  updateLocation(location: string): void {
    this.selectedLocation = location;
  }

  filterStays(): void {
    this.filteredStays = this.stays.filter(stay => this.isValidStay(stay));
  }

  isValidStay(stay: any): boolean {
    if (this.selectedLocation && this.getLocation(stay) !== this.selectedLocation) {
      return false;
    }
    return stay.maxGuests >= this.guestCount.adults + this.guestCount.children;
  }

  getLocation(stay: any): string {
    return stay.city + ', ' + stay.country;
  }

  updateActiveFilterInput(activeFilterInput: ''|'L'|'G'): void {
    this.activeFilterInput = activeFilterInput;
  }

}
