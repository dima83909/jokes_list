import { NgModule } from '@angular/core';
import { SearchPipe } from './search.pipe';
import { EachPipe } from './each.pipe';
import { SafePipe } from './safe.pipe';
@NgModule({
  exports: [SearchPipe, EachPipe, SafePipe],
  declarations: [SearchPipe, EachPipe, SafePipe]
})
export class PipesModule { }
