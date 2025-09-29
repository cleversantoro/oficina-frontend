import {Component} from '@angular/core';
import {UiCard} from '@app/components/ui-card';
import {CountUpModule} from 'ngx-countup';
import {currency} from '@/app/constants';
import {LucideAngularModule, LucideShoppingBag} from 'lucide-angular';

@Component({
  selector: 'app-orders-and-sales',
  imports: [
    UiCard,
    CountUpModule,
    LucideAngularModule
  ],
  template: `
    <app-ui-card title="My Orders & Sales" [isCloseable]="true" [isTogglable]="true" [isReloadable]="true">
      <div card-body>
        <div class="d-flex justify-content-between mb-3">
          <div>
            <h5 class="text-muted mb-1">Sales Performance</h5>
            <h4 class="fw-semibold mb-3">E-commerce Dashboard</h4>
            <p class="text-muted mb-2 fs-xs">
              You’ve had strong order flow this week with consistent revenue from your top-selling products.
            </p>
            <p class="text-muted fs-xs">
              Consider offering discounts to increase conversion on cart abandoners.
            </p>
          </div>
          <div>
            <lucide-angular [img]="LucideShoppingBag" class="text-primary fill-primary fs-32"/>
          </div>
        </div>

        <div class="row text-center">
          <div class="col-6 mb-3">
            <div class="fs-5 fw-semibold text-primary"><span [countUp]="1240" [options]="{duration:0.7}">0</span></div>
            <div class="fs-xs fw-semibold text-muted text-uppercase">Orders</div>
          </div>
          <div class="col-6 mb-3">
            <div class="fs-5 fw-semibold text-primary">{{currency}}<span  [countUp]="18760">0</span></div>
            <div class="fs-xs fw-semibold text-muted text-uppercase">Total Sales</div>
          </div>
          <div class="col-6 mb-3">
            <div class="fs-5 fw-semibold"><span  [countUp]="178">0</span></div>
            <div class="fs-xs fw-semibold text-muted text-uppercase">Pending Orders</div>
          </div>
          <div class="col-6 mb-3">
            <div class="fs-5 fw-semibold"><span [countUp]="92">0</span></div>
            <div class="fs-xs fw-semibold text-muted text-uppercase">Refund Requests</div>
          </div>
        </div>
      </div>
      <div class="card-footer text-muted text-center" card-footer>
        Revenue increased by 18% compared to yesterday
      </div>
    </app-ui-card>
  `,
  styles: ``
})
export class OrdersAndSales {

  protected readonly currency = currency;
  protected readonly LucideShoppingBag = LucideShoppingBag;
}
