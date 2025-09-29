import {Component} from '@angular/core';
import {currency} from '@/app/constants';
import {Chartjs} from '@app/components/chartjs';
import {ChartConfiguration} from 'chart.js';
import {getColor} from '@/app/utils/color-utils';
import {LucideAngularModule, LucideArrowUp, LucideBanknote} from 'lucide-angular';

@Component({
  selector: 'app-today-income',
  imports: [
    Chartjs,
    LucideAngularModule
  ],
  template: `
    <div class="card card-h-100">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h5 class="fw-normal text-uppercase">Today Income</h5>
          </div>
          <div>
            <lucide-angular [img]="LucideBanknote" class="text-muted fs-42 svg-sw-10"/>
          </div>
        </div>


        <div class="mb-3">
          <app-chartjs [getOptions]="incomeChartOptions" style="max-height: 60px"/>
        </div>


        <div class="d-flex justify-content-between">
          <div>
            <small class="text-muted">Today</small>
            <div class="fw-semibold">{{ currency }}1,340.75</div>
          </div>
          <div class="text-end">
            <small class="text-muted">Last Week</small>
            <div class="fw-semibold">{{ currency }}9,210.60
              <lucide-angular [img]="LucideArrowUp"/>
            </div>
          </div>
        </div>
      </div>

      <div class="card-footer text-muted text-center">
        Revenue increased by 18% compared to yesterday
      </div>
    </div>
  `,
  styles: ``
})
export class TodayIncome {
  protected readonly currency = currency;

  incomeChartOptions = (): ChartConfiguration => ({
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        data: [0, 15, 10, 20, 18, 25, 30],
        backgroundColor: getColor('chart-primary-rgb', 0.6),
        borderColor: getColor('chart-primary'),
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      },
      scales: {
        x: {
          display: false,
          grid: { display: false }
        },
        y: {
          display: false,
          grid: { display: false }
        }
      }
    }
  })
  protected readonly LucideBanknote = LucideBanknote;
  protected readonly LucideArrowUp = LucideArrowUp;
}
