/* eslint-disable @angular-eslint/no-inputs-metadata-property */
import { NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { startWith, Subject, takeUntil, tap } from 'rxjs';

let nextUniqueId = 0;

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'a[aplzSidenavLink]',
  standalone: true,
  imports: [NgIf, RouterModule],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [
    {
      directive: RouterLinkActive,
    },
  ],
  template: `
    <div class="aplazo-sidenav-link__icon" #svgContainer></div> 
    <span class="aplazo-sidenav-link__label aplazo-sidenav-link__label-pretty">
        <ng-content></ng-content>
    </span>
  `,
  styleUrls: ['./aplazo-sidenav-link.component.css'],
})
export class AplazoSidenavLinkComponent implements OnInit, OnDestroy, AfterViewInit  {
  
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  
  readonly #routerLink: RouterLinkActive | null = inject(RouterLinkActive, {
    host: true,
    optional: true,
  });
  
  #destroy = new Subject<void>();
  
  #classnames = {
    base: 'aplazo-sidenav-link',
    modifier: 'aplazo-sidenav-link--no-selection',
  };
  
  #uid = `aplz-ui-sidenav-link--${nextUniqueId++}`;
  
  @Input()
  set id(value: string) {
    this.#id = value || this.#uid;
  }
  get id(): string {
    return this.#id;
  }
  #id: string = this.#uid;
  
  @ViewChild('svgContainer', { static: false }) svgContainer!: ElementRef;
  @Input() svgIcon: string | null = null;

  /** Internal reference to handle the classes of the host
   * @ignore
   */
  @HostBinding('class')
  get class(): string {
    return Object.values(this.#classnames).filter(Boolean).join(' ');
  }

  ngOnInit(): void {
    this.#routerLink?.isActiveChange
      .pipe(
        takeUntil(this.#destroy),
        startWith(this.#routerLink.isActive),
        tap((isActive) => {
          if (isActive) {
            this.#classnames.modifier = 'aplazo-sidenav-link--active';
          } else {
            this.#classnames.modifier = 'aplazo-sidenav-link--no-selection';
          }
        })
      )
      .subscribe();
  }

  ngAfterViewInit() {
    if (this.svgContainer) {
      this.renderer.setProperty(this.svgContainer.nativeElement, 'innerHTML', this.svgIcon);
    }
  }
  ngOnDestroy(): void {
    this.#destroy.next();
    this.#destroy.complete();
  }
}
