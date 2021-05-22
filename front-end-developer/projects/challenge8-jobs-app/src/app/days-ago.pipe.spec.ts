import { DaysAgoPipe } from './days-ago.pipe';

describe('DaysAgoPipe', () => {
  const pipe = new DaysAgoPipe();
  const baseTime = new Date('2021-05-21 05:30');

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "today" when date difference is less than 1 days', () => {
    jasmine.clock().mockDate(baseTime);
    const date = new Date('2021-05-21').toString();
    expect(pipe.transform(date)).toBe('today');
  });

  it('should return "a day ago" when date difference is less than 2 days', () => {
    jasmine.clock().mockDate(baseTime);
    const date = new Date('2021-05-22').toString();
    expect(pipe.transform(date)).toBe('a day ago');
  });

  it('should return "x days ago" when date difference is more than 2 days', () => {
    jasmine.clock().mockDate(baseTime);
    const date = new Date('2021-05-24').toString();
    expect(pipe.transform(date)).toBe('3 days ago');
  });
});
