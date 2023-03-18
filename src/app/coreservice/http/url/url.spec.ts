import { Url } from './url';

describe('api-url', () => {
  let apiUrl: Url;

  beforeEach(() => {
    apiUrl = new Url('http://api/:resource/:resourceId');
  });

  it('should insert one param', () => {
    const url = apiUrl.toString({ resource: 'resource' });
    expect(url).toBe('http://api/resource');
  });

  it('should insert all params', () => {
    const url = apiUrl.toString({ resource: 'resource', resourceId: '1' });
    expect(url).toBe('http://api/resource/1');
  });

  it('should collapse unused params', () => {
    const url = apiUrl.toString({ resourceId: 1 });
    expect(url).toBe('http://api/1');
  });

  it('should callapse all params', () => {
    const url = apiUrl.toString();
    expect(url).toBe('http://api');
  });
});
