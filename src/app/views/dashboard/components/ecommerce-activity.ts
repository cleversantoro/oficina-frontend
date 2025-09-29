import {Component} from '@angular/core';
import {UiCard} from '@app/components/ui-card';
import {NgIcon} from '@ng-icons/core';

export type StatItemType = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

@Component({
  selector: 'app-ecommerce-activity',
  imports: [
    UiCard,
    NgIcon
  ],
  template: `
    <app-ui-card title="eCommerce Activity" [isCloseable]="true" [isReloadable]="true" [isTogglable]="true">
      <ng-container card-body>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h5 class="mb-0">Key Metrics</h5>
          </div>
          <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-default active">Today</button>
            <button type="button" class="btn btn-default">Month</button>
          </div>
        </div>

        <!-- dashboard.component.html -->
        @for (stat of stats; track $index; let last = $last) {
          <div
            class="d-flex justify-content-between align-items-center"
            [class]="last ? 'pt-2':'border-bottom  py-2'"
          >
            <div>
              <h4 class="fw-normal mb-0">
                <span [attr.data-target]="stat.value">{{ stat.value }}</span>
              </h4>
              <div class="text-muted">{{ stat.title }}</div>
            </div>
            <div
              class="text-end"
              [class]="stat.isPositive ? 'text-success' : 'text-warning'"
            >
              {{ stat.change }}
              @if (stat.isPositive) {
                <ng-icon name="tablerArrowUp"/>
              } @else {
                <ng-icon name="tablerArrowDown"/>
              }
            </div>
          </div>
        }

      </ng-container>

      <div class="card-footer text-muted text-center" card-footer>
        Sales are up by 12.5% compared to last week
      </div>
    </app-ui-card>
  `,
  styles: ``
})
export class EcommerceActivity {
  stats: StatItemType[] = [
    {
      title: 'Total Orders',
      value: '1,124',
      change: '+12%',
      isPositive: true,
    },
    {
      title: 'Total Revenue',
      value: '18,750',
      change: '+9%',
      isPositive: true,
    },
    {
      title: 'Abandoned Carts',
      value: '348',
      change: '-6%',
      isPositive: false,
    },
    {
      title: 'New Customers',
      value: '892',
      change: '+18%',
      isPositive: true,
    },
  ];

}
