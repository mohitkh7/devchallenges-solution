import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { Breed } from './app.models';

@Pipe({
  name: 'withLoading'
})
export class WithLoadingPipe implements PipeTransform {

  transform(val: any, ...args: unknown[]): Promise<Obs> {
    return isObservable(val)
      ? val.pipe(
        map((value: any) => ({ loading: false, value })),
        startWith({ loading: true }),
        catchError(error => of({ loading: false, error }))
      )
      : val;
  }
}

interface Obs {
  loading: boolean,
  value: Breed[],
  value2: [{
    name: string,
    description: string,
    image: {
      url: string
    },
    url: string
  }],
  error: any,
}

