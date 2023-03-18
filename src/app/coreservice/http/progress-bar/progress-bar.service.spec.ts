import { HttpProgressService, HttpProgressState } from './progress-bar.service';
import { fakeAsync } from '@angular/core/testing';

describe('progress bar service', () => {
  let service: HttpProgressService;

  beforeEach(() => {
    service = new HttpProgressService();
  });

  it('should set state to in progress', fakeAsync(() => {
    const inProgress: HttpProgressState = 'inProgress';

    service.stateChange.subscribe(state => {
      expect(state).toBe(inProgress);
    });

    service.start();
    expect(service.state).toBe(inProgress);
  }));

  it('should set state to stopped', fakeAsync(() => {
    const stopped: HttpProgressState = 'stopped';

    service.start();

    service.stateChange.subscribe(state => {
      expect(state).toBe(stopped);
    });

    service.stop();
    expect(service.state).toBe(stopped);
  }));
});
