import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {NgxIconicService} from './ngx-iconic.service';
import {IconNames, IconSizes, IconStyle} from './icons.types';
import {CommonModule} from '@angular/common';
import {NGX_ICONIC_CONFIG, NgxIconicConfig} from './ngx-iconic.config';

type iconsVariants =
  'materialIcons'
  | 'miFull'
  | 'mi_full'
  | 'mi'
  | 'mif'
  | 'materialIconsOutlined'
  | 'miOutlined'
  | 'mi_outlined'
  | 'mio'
  | 'materialIconsRound'
  | 'miRound'
  | 'mi_round'
  | 'mir'
  | 'materialIconsSharp'
  | 'miSharp'
  | 'mi_sharp'
  | 'mis'
  | 'materialIconsTwoTone'
  | 'miTwoTone'
  | 'mi_twoTone'
  | 'mit';
export const styleMap: Record<iconsVariants | string, IconStyle> = {
  materialIcons: 'materialIcons',
  miFill: 'materialIcons',
  mi_fill: 'materialIcons',
  mat_fill: 'materialIcons',
  mi: 'materialIcons',
  mif: 'materialIcons',
  materialIconsOutlined: 'materialIconsOutlined',
  miOutlined: 'materialIconsOutlined',
  mi_outlined: 'materialIconsOutlined',
  mat_outlined: 'materialIconsOutlined',
  mat_outline: 'materialIconsOutlined',
  mio: 'materialIconsOutlined',
  materialIconsRound: 'materialIconsRound',
  miRound: 'materialIconsRound',
  mi_round: 'materialIconsRound',
  mat_round: 'materialIconsRound',
  mir: 'materialIconsRound',
  materialIconsSharp: 'materialIconsSharp',
  miSharp: 'materialIconsSharp',
  mi_sharp: 'materialIconsSharp',
  mat_sharp: 'materialIconsSharp',
  mis: 'materialIconsSharp',
  materialIconsTwoTone: 'materialIconsTwoTone',
  miTwoTone: 'materialIconsTwoTone',
  mi_twoTone: 'materialIconsTwoTone',
  mat_twoTone: 'materialIconsTwoTone',
  mit: 'materialIconsTwoTone',

}

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
export class NgxIconComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() icon?: IconNames;
  @Input() iconStyle?: IconStyle;
  @Input() size?: IconSizes;
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

  ngOnChanges(changes: SimpleChanges): void {
    this.prepareIcon();
  }


  ngOnInit(): void {
    this.prepareIcon();
  }


  ngAfterViewInit(): void {
    const fromContainer = this.contentElement.nativeElement.innerHTML.trim();
    this.contentElement.nativeElement.style.display = 'none';

    if (fromContainer && !this.icon) {
      const icon = fromContainer.split(' ');
      if (icon.length === 2) {
        setTimeout(() => {
          this.icon = icon[1] as IconNames;
          this.iconStyle = styleMap[icon[0]] as IconStyle || 'materialIcons';
          this.prepareIcon();
        }, 1);
      }
    }
    if (this.config?.flipInRtl && this.flip === undefined) {
      const documentDir = document.dir as 'ltr' | 'rtl';
      const rtlParent = this.elementRef.nativeElement.closest('[dir="rtl"]');
      const parentStyle = window.getComputedStyle(this.elementRef.nativeElement.parentElement);
      const parentDir = parentStyle.direction;

      setTimeout(() => {
        this.direction = documentDir === 'rtl' || rtlParent || parentDir === 'rtl' ? 'rtl' : 'ltr';
        this.flip = this.direction === 'rtl';
      }, 1);

    }

  }

  private prepareIcon() {

    const element = this.elementRef.nativeElement;

    // Remove any existing size classes
    if (this.size) {
      const sizeClasses = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl',
        'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl',
        'text-8xl', 'text-9xl'];
      sizeClasses.forEach(sizeClass => element.classList.remove(sizeClass));
      const sizeClass = this.size ? `text-${this.size}` : 'text-base';
      element.classList.add(sizeClass);
    }

    const url = this.icon
      ? this.iconService.getIconPath(this.icon, this.iconStyle)
      : this.iconService.getIconPath('all_out');
    this.http.get(url, {responseType: 'text'}).subscribe(svgContent => {
      this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(svgContent);
    });
  }
}

