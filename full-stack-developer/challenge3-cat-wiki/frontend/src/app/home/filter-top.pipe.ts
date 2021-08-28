import { Pipe, PipeTransform } from '@angular/core';
import { Breed } from '../app.models';

@Pipe({
  name: 'filterTop'
})
export class FilterTopPipe implements PipeTransform {

  transform(breedList: Breed[], count: number, ...args: unknown[]): Breed[] {
    let breeds = [];
    if (breedList.length) {
      breeds.push(breedList[40]);
      breeds.push(breedList[16]);
      breeds.push(breedList[63]);
      breeds.push(breedList[13]);
    }
    return breeds;
  }
}

