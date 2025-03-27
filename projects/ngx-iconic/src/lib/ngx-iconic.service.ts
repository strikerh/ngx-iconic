import { Injectable } from '@angular/core';
import { IconNames, IconTypes} from './icons.types';
// https://raw.githubusercontent.com/google/material-design-icons/refs/heads/master/update/current_versions.json
@Injectable({
  providedIn: 'root'
})
export class NgxIconicService {

  // iconBasePath = '/iconic/svg/';
  iconBasePath = 'https://fonts.gstatic.com/s/i';
  constructor() { }

  getIconPath(name: IconNames, type: IconTypes = 'materialIcons'): string {
    // `http://localhost:4200/iconic/svg/av/5k/materialicons/24px.svg`
    // https://fonts.gstatic.com/s/i/materialicons/<icon-name>/v1/24px.svg
   return `${this.iconBasePath}/${type.toLowerCase()}/${name}/v1/24px.svg`;
  }

}
