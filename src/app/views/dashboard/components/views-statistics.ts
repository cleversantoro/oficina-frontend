import {Component} from '@angular/core';
import {Chartjs} from '@app/components/chartjs';
import {CountUpModule} from 'ngx-countup';
import {ChartConfiguration} from 'chart.js';
import {getColor} from '@/app/utils/color-utils';
import {LucideActivity, LucideAngularModule, LucideClock, LucideZap} from 'lucide-angular';

@Component({
  selector: 'app-views-statistics',
  imports: [CountUpModule, Chartjs, LucideAngularModule],
  template: `
    <div class="card">
      <div class="card-body">
        <div class="row align-items-center">
          <div class="col-xl-3 col-md-6">
            <div class="text-center">
              <p
                class="mb-4 d-flex align-items-center gap-1 justify-content-center"
              >
                <lucide-angular [img]="LucideZap" />
                Page views
              </p>
              <h2 class="fw-bold mb-0"><span [countUp]="226802" [options]="{duration:0.7}">0</span></h2>
              <p class="text-muted">Page views in last month</p>
              <p
                class="mb-0 mt-4 d-flex align-items-center gap-1 justify-content-center"
              >
                <lucide-angular [img]="LucideClock" /> Data from  January
              </p>
            </div>
          </div>

          <div class="col-xl-3 col-md-6 order-xl-last">
            <div class="text-center">
              <p
                class="mb-4 d-flex align-items-center gap-1 justify-content-center"
              >
                <lucide-angular [img]="LucideActivity" />
                Active duration
              </p>
              <h2 class="fw-bold mb-0">10 Months</h2>
              <p class="text-muted">And four weeks</p>
              <p
                class="mb-0 mt-4 d-flex align-items-center gap-1 justify-content-center"
              >
                <lucide-angular [img]="LucideClock" />
                Last active in 12.05.2025
              </p>
            </div>
          </div>

          <div class="col-xl-6">
            <div class="w-100" style="height: 240px;">
              <app-chartjs
                [height]="240"
                [getOptions]="activeUsersChartOptions"
                style="max-height: 240px"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer">
        <div
          class="d-flex align-items-center text-muted justify-content-between"
        >
          <div>Last update: 21.05.2025</div>
          <div>You have two new messages from Monica Bolt</div>
        </div>
      </div>
    </div>
  `,
  styles: ``
})
export class ViewsStatistics {
  activeUsersChartOptions = (): ChartConfiguration => ({
    type: 'line',
    data: {
      labels: ['0', '1', '2', '3', '4', '5', '6', '7'],
      datasets: [
        {
          label: 'Current Month',
          data: [50, 42, 38, 35, 40, 50, 48, 47],
          fill: true,
          borderColor: getColor('chart-secondary'),
          backgroundColor: getColor('chart-secondary-rgb', 0.2),
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 1
        },
        {
          label: 'Past Month',
          data: [60, 55, 50, 45, 50, 58, 55, 53],
          fill: true,
          borderColor: getColor('chart-gray'),
          backgroundColor: getColor('chart-gray-rgb', 0.2),
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 1
        }
      ]
    }
  })
  protected readonly LucideZap = LucideZap;
  protected readonly LucideClock = LucideClock;
  protected readonly LucideActivity = LucideActivity;
}
