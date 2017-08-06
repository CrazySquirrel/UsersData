import {GeoHrefPipe} from './index';

describe('TitleCasePipe', () => {
  const pipe = new GeoHrefPipe();

  it('transforms"', () => {
    expect(pipe.transform({
      lat: "test1",
      lng: "test2"
    })).toBe('//maps.google.com/maps?ll=test1,test2');
  });
});
