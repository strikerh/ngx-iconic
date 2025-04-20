import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxIconComponent } from 'ngx-iconic';
import { IconBrowserComponent } from './icon-browser/icon-browser.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxIconComponent, IconBrowserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  title = 'NgxIconic Demo';
}
