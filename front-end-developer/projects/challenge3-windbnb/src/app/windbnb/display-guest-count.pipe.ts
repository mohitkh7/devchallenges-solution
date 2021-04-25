import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayGuestCount',
  pure: false
})
export class DisplayGuestCountPipe implements PipeTransform {

  transform(guestCount: any): string {
    let adultsStr = '';
    let seperatorStr = '';
    let childrenStr = '';
    if (guestCount.adults === 0 && guestCount.children === 0) {
      return 'Add guests';
    }
    if (guestCount.adults) {
      const suffix = guestCount.adults === 1 ? 'adult' : 'adults';
      adultsStr = guestCount.adults + ' ' + suffix;
    }
    if (guestCount.children) {
      const suffix = guestCount.children === 1 ? 'child' : 'children';
      childrenStr = guestCount.children + ' ' + suffix;
    }
    if (adultsStr && childrenStr) {
      seperatorStr = ', ';
    }
    return adultsStr + seperatorStr + childrenStr;
  }

}
