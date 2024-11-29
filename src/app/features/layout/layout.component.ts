import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { AplazoButtonComponent } from '@apz/shared-ui/button';
import { AplazoDashboardComponents } from '@apz/shared-ui/dashboard';
import { AplazoSidenavLinkComponent } from '../../../../projects/shared-ui/sidenav/src';
import { ROUTE_CONFIG } from '../../core/infra/config/routes.config';
import { filter, map } from 'rxjs';
import { LogoutUseCase } from '../login/application/logout.usecase';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  imports: [
    AplazoDashboardComponents,
    AplazoButtonComponent,
    AplazoSidenavLinkComponent,
    RouterOutlet,
    RouterLink,
  ],
})
export class LayoutComponent {
  public title: string =  ROUTE_CONFIG.home;
  readonly appRoutes = ROUTE_CONFIG;

  readonly #router = inject(Router);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly logoutUseCase = inject(LogoutUseCase);

  readonly svgIconHome = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                          </svg>`;

  readonly svgIconHistorial = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                              </svg>`;


  ngOnInit(): void {
    this.setTitleFromRoute();

    this.#router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => this.getTitleFromRoute())
      )
      .subscribe((title: string) => {
        this.title = title;
      });
  }

  private getTitleFromRoute(): string {
    let route = this.#activatedRoute;
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.data['title'] || ROUTE_CONFIG.home; 
  }

  private setTitleFromRoute(): void {
    this.title = this.getTitleFromRoute(); 
  }

  onLogout(): void {
    this.logoutUseCase.execute();
  }

  clickLogo(): void {
    this.#router.navigate([`${ROUTE_CONFIG.app}/${ROUTE_CONFIG.home}`]);
  }
}
