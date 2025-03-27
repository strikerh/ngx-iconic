import {InjectionToken} from '@angular/core';

export interface NgxIconicConfig {
  defaultIcon?: string;
  iconBasePath?: string;
  flipInRtl?: boolean;
}

export const DEFAULT_ICONIC_CONFIG: NgxIconicConfig = {
  defaultIcon: 'all_out',
  iconBasePath: 'assets/icons',
  flipInRtl: true
};

export const NGX_ICONIC_CONFIG = new InjectionToken<NgxIconicConfig>('NGX_ICONIC_CONFIG', {
  factory: () => DEFAULT_ICONIC_CONFIG
});

export function provideNgxIconic(config: Partial<NgxIconicConfig> = {}) {
  return {
    provide: NGX_ICONIC_CONFIG,
    useValue: { ...DEFAULT_ICONIC_CONFIG, ...config }
  };
}
