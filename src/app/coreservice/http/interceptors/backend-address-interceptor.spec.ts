import { HttpHandler, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpProgressService } from '@app/coreservice/http';
import { environment } from '@env/environment';
import { BackendAddressInterceptor } from './backend-address-interceptor';

describe('backend address interceptor', () => {
  let interceptor: BackendAddressInterceptor;

  beforeEach(() => {
    interceptor = new BackendAddressInterceptor(new HttpProgressService());
  });

  it('should replace token url', () => {
    const req: HttpRequest<any> = new HttpRequest<any>('GET', 'token');

    const handle = jasmine.createSpy('handle').and.returnValue(of(''));
    const handler: HttpHandler = { handle };
    interceptor.intercept(req, handler);
    const reqArg: HttpRequest<any> = handle.calls.mostRecent().args[0];

    expect(reqArg.url).toEqual(`${environment.api.addr}/${req.url}`);
  });

  it('should replace api url', () => {
    const req: HttpRequest<any> = new HttpRequest<any>('GET', 'backend');

    const handle = jasmine.createSpy('handle').and.returnValue(of(''));
    const handler: HttpHandler = { handle };
    interceptor.intercept(req, handler);
    const reqArg: HttpRequest<any> = handle.calls.mostRecent().args[0];

    expect(reqArg.url).toBe(
      `${environment.api.addr}/${req.url}`
    );
  });
});
