import { NgModule } from '@angular/core';
import { HttpProgressBarComponent } from './progress-bar.component';
import { HttpProgressService } from './progress-bar.service';

@NgModule({
  imports: [],
  declarations: [HttpProgressBarComponent],
  exports: [HttpProgressBarComponent],
  providers: [HttpProgressService]
})
export class HttpProgressModule {}
