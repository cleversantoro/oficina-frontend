import {Component, Input} from '@angular/core';
import {NgIcon} from '@ng-icons/core';
import {RouterLink} from '@angular/router';
import {LucideAngularModule, LucideSquareArrowUpRight} from 'lucide-angular';

@Component({
  selector: 'app-page-title',
  imports: [
    NgIcon,
    RouterLink,
    LucideAngularModule
  ],
  template: `
      <div class="page-title-head d-flex align-items-center" [class.active]="isActive">
        <div class="flex-grow-1">
          <h4 class="fs-lg fw-bold mb-2 lh-1">{{ title }}</h4>
          <p class="text-muted mb-0 fs-xs lh-1">Built for Speed. Designed for Control.</p>
        </div>

        <div class="text-end">
          <button type="button" class="btn btn-link fs-16 mb-1 p-0" (click)="toggleActive()"><lucide-angular [img]="LucideSquareArrowUpRight" class="btn-page-head-icon"/></button>
          <ol class="breadcrumb m-0 py-0 fs-xs">
            <li class="breadcrumb-item"><a routerLink="/">Oficina</a></li>
            <li class="d-flex justify-content-center align-items-center">
              <ng-icon name="tablerChevronRight" size="14" class="breadcrumb-arrow  mx-1"/>
            </li>
            @if (subTitle) {
              <li class="breadcrumb-item"><a href="javascript: void(0);">{{ subTitle }}</a></li>
              <li class="d-flex justify-content-center align-items-center">
                <ng-icon name="tablerChevronRight" size="14" class="breadcrumb-arrow  mx-1"/>
              </li>
            }
            <li class="breadcrumb-item active">{{ title }}</li>
          </ol>
        </div>
      </div>
  `,
  styles: ``
})
export class PageTitle {
  @Input() title: string = 'Welcome!';
  @Input() subTitle: string | null = null;

  isActive = false;

  toggleActive(): void {
    this.isActive = !this.isActive;
  }

  protected readonly LucideSquareArrowUpRight = LucideSquareArrowUpRight;
}
