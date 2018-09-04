import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FilePipeSize } from './file-size/file-size.pipe';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [FilePipeSize],
  bootstrap: [AppComponent]
})
export class AppModule {}
