import {PhoneHrefPipe} from './index';

describe('TitleCasePipe', () => {
  const pipe = new PhoneHrefPipe();

  it('transforms"', () => {
    expect(pipe.transform("+7(964)799-94-81")).toBe('tel:79647999481');
  });
});
