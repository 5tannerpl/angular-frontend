import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { UrlDiscoverer } from '../http';
import { HttpService } from './http.service';
import { Resource } from './url';

class MockValue {
  constructor(json) {
    this.value = json.value;
  }

  value: string;
}

class MockResource extends Resource {
  constructor(json) {
    if (json) {
      super(json._links);
    } else {
      super();
    }
  }
}

describe('http service', () => {
  let service: HttpService;
  let backend: HttpTestingController;
  const url = '/url';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService, UrlDiscoverer]
    });

    service = TestBed.get(HttpService);
    backend = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    backend.verify();
  });

  describe('getHeader', () => {
    it('should return header value', fakeAsync(() => {
      const headerValue = 'x-header-value';

      service.getHeaders(url, ['x-header']).subscribe(res => {
        expect(res[0]).toEqual(headerValue);
      });

      backend
        .expectOne(req => req.url === url && req.method === 'HEAD')
        .flush('', { headers: { 'x-header': headerValue } });
    }));
  });

  describe('getSingle', () => {
    it('should return single value', fakeAsync(() => {
      const response = {
        value: 'value'
      };

      service.getSingle(url).subscribe(res => {
        expect(res).toEqual(response);
      });

      backend
        .expectOne(req => req.url === url && req.method === 'GET')
        .flush(response);
    }));

    it('should use constructor', fakeAsync(() => {
      const response = {
        value: 'value'
      };

      service.getSingle(url, MockValue).subscribe(res => {
        expect(res instanceof MockValue).toBeTruthy();
      });

      backend
        .expectOne(req => req.url === url && req.method === 'GET')
        .flush(response);
    }));
  });

  describe('getSingleByResource', () => {
    it('should use url from resource', fakeAsync(() => {
      const resource = new MockResource({
        _links: [
          {
            rel: 'test',
            href: '/url'
          }
        ]
      });

      const value = new MockValue({});

      service.getSingleByResource(resource, 'test').subscribe(res => {
        expect(res).toEqual(value);
      });

      backend.expectOne('/url').flush(value);
    }));

    it('should use constructor', fakeAsync(() => {
      const resource = new MockResource({
        _links: [
          {
            rel: 'test',
            href: '/url'
          }
        ]
      });

      service
        .getSingleByResource(resource, 'test', MockValue)
        .subscribe(res => {
          expect(res instanceof MockValue).toBeTruthy();
        });

      backend.expectOne('/url').flush({ value: 'value' });
    }));
  });

  describe('getCollection', () => {
    it('should return collection', fakeAsync(() => {
      service.getCollection(url, MockValue).subscribe(res => {
        expect(res.every(x => x instanceof MockValue)).toBeTruthy();
      });

      backend.expectOne(url).flush([
        {
          value: '123'
        },
        {
          value: '345'
        }
      ]);
    }));
  });

  describe('getByPage', () => {
    it('should use constractor to map data', fakeAsync(() => {
      const pagedData = {
        total: 10,
        page: 1,
        pageSize: 5,
        data: [
          {
            value: '123'
          },
          {
            value: '345'
          }
        ]
      };

      const pageNumber = 1;
      const pageSize = 5;

      service.getByPage(url, pageNumber, pageSize, MockValue).subscribe(res => {
        expect(res.data.every(x => x instanceof MockValue)).toBeTruthy();
      });

      backend
        .expectOne(`${url}?pageNumber=${pageNumber}&pageSize=${pageSize}`)
        .flush(pagedData);
    }));
  });
});
