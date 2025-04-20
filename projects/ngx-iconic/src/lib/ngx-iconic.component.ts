import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnInit,
  Optional,
  ViewChild
} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {NgxIconicService} from './ngx-iconic.service';
import {IconNames, IconStyle} from './icons.types';
import {CommonModule} from '@angular/common';
import {NGX_ICONIC_CONFIG, NgxIconicConfig} from './ngx-iconic.config';

@Component({
  selector: 'iconic',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <span class="ngx-icon"
          [ngClass]="icon" [attr.data-icon]="icon"
          [style.color]="color "
          [innerHTML]="svgIcon">
    </span>
    <div #content>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./ngx-iconic.component.scss'],
})
export class NgxIconComponent implements OnInit, AfterViewInit {
  @Input() icon?: IconNames;
  @Input() style?: IconStyle;
  @HostBinding('class.flip')
  @Input() flip?: boolean = undefined;
  @Input() color?: string = 'currentColor';
  svgIcon?: SafeHtml;
  @HostBinding('attr.dir')
  direction: 'ltr' | 'rtl' = 'ltr';

  @ViewChild('content') contentElement!: ElementRef<HTMLElement>;


  constructor(
    private iconService: NgxIconicService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private elementRef: ElementRef,
    @Optional() @Inject(NGX_ICONIC_CONFIG) public config: NgxIconicConfig
  ) {
  }



  ngOnInit(): void {
    const url = this.icon
      ? this.iconService.getIconPath(this.icon, this.style)
      : this.iconService.getIconPath('all_out');
    this.http.get(url, {responseType: 'text'}).subscribe(svgContent => {
      this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(svgContent);
    });
  }



  ngAfterViewInit(): void {
    const fromContainer = this.contentElement.nativeElement.innerHTML.trim();
    this.contentElement.nativeElement.style.display = 'none';

    if (fromContainer) {
      debugger
    }
    if (this.config?.flipInRtl && this.flip === undefined) {
      const documentDir = document.dir as 'ltr' | 'rtl';
      const rtlParent = this.elementRef.nativeElement.closest('[dir="rtl"]');
      const parentStyle = window.getComputedStyle(this.elementRef.nativeElement.parentElement);
      const parentDir = parentStyle.direction;

      setTimeout(()=>{
        this.direction = documentDir === 'rtl' || rtlParent || parentDir === 'rtl' ? 'rtl' : 'ltr';
        this.flip = this.direction === 'rtl';
      },10);

    }

  }
}

