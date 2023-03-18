import { EventEmitter, Injectable } from '@angular/core';

export type HttpProgressState = 'stopped' | 'inProgress' | 'paused';

@Injectable()
export class HttpProgressService {
  public readonly stateChange: EventEmitter<
    HttpProgressState
  > = new EventEmitter();
  public state: HttpProgressState = 'stopped';

  private _progressCounter = 0;

  constructor() {}

  start(): void {
    this._progressCounter++;

    if (this.state === 'inProgress') {
      return;
    }

    this.setStateInProgress();
  }

  stop(): void {
    this._progressCounter--;

    if (this.state !== 'inProgress') {
      return;
    }

    this.setStateStopped();

    if (this._progressCounter > 0) {
      // if there is still request running
      // start a new cycle
      this.setStateInProgress();
    }
  }

  private setStateInProgress(): void {
    this.state = 'inProgress';
    this.stateChange.emit(this.state);
  }

  private setStateStopped(): void {
    this.state = 'stopped';
    this.stateChange.emit(this.state);
  }
}
