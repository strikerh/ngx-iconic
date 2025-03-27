import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxIconComponent } from './ngx-iconic.component';
import {NGX_ICONIC_CONFIG, NgxIconicConfig} from './ngx-iconic.config';

@NgModule({
  imports: [
    CommonModule,
    NgxIconComponent
  ]
})
export class NgxIconicModule {
  static forRoot(config: NgxIconicConfig): ModuleWithProviders<NgxIconicModule> {
    return {
      ngModule: NgxIconicModule,
      providers: [
        { provide: NGX_ICONIC_CONFIG, useValue: config }
      ]
    };
  }
}
