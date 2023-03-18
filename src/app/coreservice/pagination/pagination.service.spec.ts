import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { PaginationService } from './pagination.service';
import { HttpService } from '../http/http.service';
import { UrlDiscoverer } from '../http';

describe('pagination service', () => {
  let service: PaginationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],

      providers: [PaginationService, UrlDiscoverer, HttpService]
    });

    service = TestBed.get(PaginationService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send request for current page', () => {
    const data = {
      total: 1,
      page: 1,
      pageSize: 5,
      data: ['1'],
      _links: [
        {
          rel: 'self',
          href: '/self'
        }
      ]
    };

    service.currPage(data).subscribe();

    const req = httpMock.expectOne('/self');
    expect(req.request).toBeDefined();
  });

  it('should send request for current page with params', () => {
    const data = {
      total: 1,
      page: 1,
      pageSize: 5,
      data: ['1'],
      _links: [
        {
          rel: 'self',
          href: '/self?pageSize=15&page=10'
        }
      ]
    };

    service
      .currPage(data, Object, {
        params: {
          pageSize: '10',
          page: '2'
        }
      })
      .subscribe();

    const req = httpMock.expectOne('/self?pageSize=10&page=2');
    expect(req.request).toBeDefined();
  });

  it('should send request for last page', () => {
    const data = {
      total: 1,
      page: 1,
      pageSize: 5,
      data: ['1'],
      _links: [
        {
          rel: 'next',
          href: '/next'
        }
      ]
    };

    service.nextPage(data).subscribe();
    const req = httpMock.expectOne('/next');
    expect(req.request).toBeDefined();
  });

  it('should send request for prev page', () => {
    const data = {
      total: 1,
      page: 1,
      pageSize: 5,
      data: ['1'],
      _links: [
        {
          rel: 'prev',
          href: '/prev'
        }
      ]
    };

    service.prevPage(data).subscribe();
    const req = httpMock.expectOne('/prev');
    expect(req.request).toBeDefined();
  });
});
