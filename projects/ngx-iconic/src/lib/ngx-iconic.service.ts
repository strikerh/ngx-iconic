import {Inject, Injectable, Optional} from '@angular/core';
import {IconNames, IconStyle} from './icons.types';
import {allIconsShort} from './all_icons_short';
import {NGX_ICONIC_CONFIG, NgxIconicConfig} from './ngx-iconic.config';
// https://raw.githubusercontent.com/google/material-design-icons/refs/heads/master/update/current_versions.json
type IconIndex = typeof allIconsShort;

interface IconMeta {
  type: IconStyle;
  iconName: IconNames;
  fileName: string;
  category: string;
  path?: string;
  localPath: string;
  version: number;
  onlinePath: string
}

@Injectable({
  providedIn: 'root'
})
export class NgxIconicService {

  // iconBasePath = '/iconic/svg/';
  iconBasePath = 'https://fonts.gstatic.com/s/i';
 @Optional() @Inject(NGX_ICONIC_CONFIG) public config: NgxIconicConfig = {
  iconBasePath: '/iconic/svg'
};

  constructor() {
  }

  getIconPath(name: IconNames, type: IconStyle = 'materialIcons', online: boolean = false): string {
    // `http://localhost:4200/iconic/svg/av/5k/materialicons/24px.svg`
    // https://fonts.gstatic.com/s/i/materialicons/<icon-name>/v1/24px.svg
    if (false) {
      return `${this.iconBasePath}/${type.toLowerCase()}/${name}/v1/24px.svg`;
    } else {
      const iconMeta = this.getIconMeta(name, type);
      if (online) {
        return `${iconMeta.onlinePath}`;
      } else {
        return `${this.config.iconBasePath}/${iconMeta.localPath}`;
      }
    }
  }

  getIconMeta(name: IconNames, styleOverride?: IconStyle, size = 24): IconMeta {
    const meta = (allIconsShort.icons as Record<string, string>)[name];
    if (!meta) throw new Error(`Icon "${name}" not found`);

    const [typeCode, catIdxStr, versionStr] = meta.split('|');
    const styleCode = styleOverride ?? typeCode;
    const type = Object.entries(allIconsShort.typeMapping);
    // Find an entry where either key or value includes the styleOverride (or use materialIcons)
    const foundTypeEntry = type.find(([key, value]) =>
      key.includes(styleOverride || 'materialIcons') ||
      value.includes(styleOverride || 'materialIcons')
    );
    const style: IconStyle = foundTypeEntry ? foundTypeEntry[1] as IconStyle : 'materialIcons';
    debugger
    const category = allIconsShort.categories[+catIdxStr];
    const version = +versionStr;
    return {
      type: style || 'materialIcons',
      iconName: name,
      fileName: `${size}px.svg`,
      category: category,
      // path: `${category}/${name}/${style}/v${version}/${size}px.svg`,
      localPath: `${category}/${name}/${style.toLowerCase()}/${size}px.svg`,
      version: version,
      // https://fonts.gstatic.com/s/i/materialicons/<icon-name>/v1/24px.svg
      //  https://fonts.gstatic.com/s/i/materialicons/arrow_back/v1/24px.svg
      //  https://fonts.gstatic.com/s/i/https://fonts.gstatic.com/s/i/materialicons/send/v1/24px.svg
      onlinePath: `${this.iconBasePath}/${style.toLowerCase()}/${name}/v1/${size}px.svg`
    }

  }
}
