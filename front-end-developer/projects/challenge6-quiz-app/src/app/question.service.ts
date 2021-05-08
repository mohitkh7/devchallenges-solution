import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  countries: Country[] = [];

  constructor(
    private http: HttpClient
  ) {}

  getCountriesData(): Promise<any> {
    // const url = 'https://restcountries.eu/rest/v2/all/?fields=name;capital;flag';
    const url = './assets/countries.json';
    return this.http.get(url).toPromise();
  }

  async getQuestion(): Promise<Question> {
    if (this.countries.length === 0) {
      this.countries = await this.getCountriesData();
    }
    const countryArr = this.getRandomSubset(this.countries, 4);
    const ansIndex = this.getRandomInt(0, 4);
    const question = this.getRandomInt(0, 10) % 2 === 0
                     ? this.prepareCapitalQuestion(countryArr, ansIndex)
                     : this.prepareFlagQuestion(countryArr, ansIndex);
    return question;
  }

  /**
   * generates random k elements from superset
   * @param countries list of all countries
   * @param count size of subset
   * @returns a random subset
   */
  getRandomSubset(countries: Country[], count: number): Country[] {
    const countryArr: Country[] = [];
    while (countryArr.length < count) {
      const i = this.getRandomInt(0, countries.length);
      const country = countries[i];
      if (countryArr.indexOf(country) === -1) {
        countryArr.push(country);
      }
    }
    return countryArr;
  }

  /**
   * generates a random integer in range of (min, max)
   * @param min Minimum integer inclusive
   * @param max Maximum integer exclusive
   * returns a random integer
   */
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * max) + min;
  }

  prepareCapitalQuestion(countryArr: any[], ansIndex: number): Question {
    const question: Question = {
      flag: '',
      text: `${countryArr[ansIndex].capital} is the capital of`,
      options: [] as any[],
      answer: ansIndex
    };
    countryArr.forEach(country => {
      question.options.push(country.name);
    });
    return question;
  }

  prepareFlagQuestion(countryArr: any[], ansIndex: number): Question {
    console.log(countryArr);
    const question: Question = {
      flag: countryArr[ansIndex].flag,
      text: 'Which country does this flag belongs to',
      options: [] as any[],
      answer: ansIndex
    };
    countryArr.forEach(country => {
      question.options.push(country.name);
    });
    return question;
  }
}

export interface Question {
  flag: string;
  text: string;
  options: any[];
  answer: number;
}

interface Country {
  name: string;
  capital: string;
  flag: string;
}
