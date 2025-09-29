import {Component, Input} from '@angular/core';
import {LucideAngularModule, LucideClock, LucideWallet} from 'lucide-angular';
import {CountUpModule} from 'ngx-countup';
import {currency} from '@/app/constants';

@Component({
  selector: 'app-widget-card1',
  imports: [
    LucideAngularModule,
    CountUpModule
  ],
  template: `
    <div class="card card-h-100">
      <div class="card-body text-center">

        <h1 class="d-flex justify-content-center">
          <lucide-angular [img]="LucideWallet" class="fs-60 text-muted svg-sw-5 svg-dashed"/>
        </h1>

        <h1 class="fw-light">
          {{ currency }}<span [countUp]="count" [options]="{decimalPlaces: 2,duration:0.7}"
                              class="counter-value">0</span>
        </h1>

        <h5 class="text-primary fw-bold">{{ title }}</h5>

        <p class="text-muted d-flex justify-content-center align-items-center mb-0 mt-3">
          <lucide-angular [img]="LucideClock" class="me-1"/>
          Last active on {{ lastActiveDate }}
        </p>
      </div>

      <div class="card-footer text-muted text-center" [innerHTML]="description">
      </div>
    </div>
  `,
  styles: ``
})
export class WidgetCard1 {
  @Input() title: string = 'All Income';
  @Input() count: number = 1206.90;
  @Input() lastActiveDate: string = "12.05.2025";
  @Input() description: string = "Total income increased by <strong>12%</strong> compared to last month.";


  protected readonly LucideWallet = LucideWallet;
  protected readonly currency = currency;
  protected readonly LucideClock = LucideClock;
}
