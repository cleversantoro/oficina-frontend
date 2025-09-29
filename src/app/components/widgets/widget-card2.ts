import {Component, Input} from '@angular/core';
import {LucideAngularModule, LucideShoppingCart} from 'lucide-angular';
import {NgbProgressbar} from '@ng-bootstrap/ng-bootstrap';
import {CountUpModule} from 'ngx-countup';

@Component({
  selector: 'app-widget-card2',
  imports: [
    LucideAngularModule,
    NgbProgressbar,
    CountUpModule
  ],
  template: `
    <div class="card card-h-100">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h5 class="fw-normal text-uppercase mb-3">{{ title }}</h5>
            <h3 class="mb-0 fw-normal"><span [countUp]="count">0</span></h3>
            <p class="text-muted mb-2">{{ progressTitle }}</p>
          </div>
          <div>
            <lucide-angular [img]="LucideShoppingCart" class="text-muted fs-42 svg-sw-10"/>
          </div>
        </div>

        <ngb-progressbar type="primary" [value]="progress" class="mb-3 progress-lg"/>

        <div class="d-flex justify-content-between">
          @for (stat of stats; track $index) {
            <div [class]="$index%2 === 0 ? 'text-start' : 'text-end'">
              <span class="text-muted">{{ stat.label }}</span>
              <h5 class="mb-0">{{ stat.value }}</h5>
            </div>
          }

        </div>
      </div>

      <div class="card-footer text-muted text-center" [innerHTML]="description">
      </div>
    </div>
  `,
  styles: ``
})
export class WidgetCard2 {
  @Input() title: string = 'Total Orders';
  @Input() count: number = 210;
  @Input() description: string = "12 new orders pending confirmation";
  @Input() progressTitle: string = "Processed this week";
  @Input() progress: number = 60;
  @Input() stats: {
    label: string,
    value: string
  }[] = [
    {
      label: "Avg. Items / Order",
      value: "7.80"
    },
    {
      label: "Repeat Customers",
      value: "76.43%"
    }
  ];

  protected readonly LucideShoppingCart = LucideShoppingCart;
}
