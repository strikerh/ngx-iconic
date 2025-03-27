import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxIconComponent } from 'ngx-iconic';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgxIconComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'

})
export class AppComponent {
  title = 'NgxIconic Demo';
}
