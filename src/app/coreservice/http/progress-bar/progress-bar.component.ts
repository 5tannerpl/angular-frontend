import { Component, ElementRef, Input, Renderer2, Self } from '@angular/core';
import { HttpProgressService, HttpProgressState } from './progress-bar.service';

@Component({
  selector: 'ngx-http-progress',
  template: '',
  styleUrls: ['./progress-bar.component.scss']
})
export class HttpProgressBarComponent {
  @Input() speed = 1;

  private _counter = 0;

  constructor(
    @Self() private _elementRef: ElementRef,
    private _renderer: Renderer2,
    private _service: HttpProgressService
  ) {
    this._service.stateChange.subscribe((state: HttpProgressState) => {
      switch (state) {
        case 'inProgress':
          this.start();
          break;
        case 'stopped':
          this.finish();
          break;
      }
    });
  }

  get el(): any {
    return this._elementRef.nativeElement;
  }

  start(): void {
    if (this._service.state !== 'inProgress') {
      return;
    }

    this.incement();
    this.updateProgressBar();

    setTimeout(() => {
      this.start();
    }, 0);
  }

  finish(): void {
    this._counter = 100;
    this.updateProgressBar();

    setTimeout(() => {
      this.reset();
    }, 500);
  }

  incement(): void {
    if (this._counter >= 80) {
      this._counter += 0.01;
    } else {
      this._counter += this.speed;
    }
  }

  updateProgressBar() {
    this._renderer.setStyle(this.el, 'width', `${this._counter}%`);
  }

  reset() {
    this._counter = 0;
    this.updateProgressBar();
  }
}
