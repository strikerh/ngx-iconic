import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideNgxIconic} from 'ngx-iconic';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideNgxIconic({
      defaultIcon: 'all_out',
      iconBasePath: '/assets/icons/',
      flipInRtl: true
    })
  ]
};
