import { Resource } from './resource';
import { UrlDiscoverer } from './url-dicoverer';

describe('api url discover', () => {
  let service: UrlDiscoverer;
  const resource: Resource = {
    _links: []
  };

  beforeEach(() => {
    service = new UrlDiscoverer();
    resource._links = [];
  });

  it('should find resource link', () => {
    const link = {
      rel: 'self',
      href: '/self'
    };

    resource._links.push(link);
    const found = service.findResourceLink(resource);
    expect(found).toBe(link);
  });

  it('should find link', () => {
    const link = {
      rel: 'delete',
      href: '/delete'
    };

    resource._links.push(link);
    const found = service.findLink(resource, 'delete');
    expect(found).toBe(link);
  });

  it('should return undefined', () => {
    let found = service.findResourceLink(resource);
    expect(found).toBeFalsy();

    found = service.findLink(resource, 'link');
    expect(found).toBeFalsy();
  });
});
