import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {allIconsShort, IconNames, IconStyle} from 'ngx-iconic';
import { NgxIconComponent } from 'ngx-iconic';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-icon-browser',
  standalone: true,
  imports: [CommonModule, NgxIconComponent, FormsModule],
  templateUrl: './icon-browser.component.html',
  styleUrl: './icon-browser.component.css'
})
export class IconBrowserComponent implements OnInit {
  searchTerm: string = '';
  selectedStyle: IconStyle = 'materialIcons';
  iconNames: IconNames[] = Object.keys(allIconsShort.icons) as IconNames[];
  filteredIcons: IconNames[] = [];
  iconStyles: IconStyle[] = ['materialIcons', 'materialIconsOutlined', 'materialIconsRound', 'materialIconsSharp', 'materialIconsTwoTone'];

  ngOnInit(): void {
    this.filterIcons();
  }

  filterIcons(): void {
    this.filteredIcons = this.iconNames.filter(iconName =>
      iconName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  copyCode(iconName: IconNames): void {
    const code = `<iconic icon="${iconName}" iconStyle="${this.selectedStyle}"></iconic>`;
    navigator.clipboard.writeText(code);
  }
}
