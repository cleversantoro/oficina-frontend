import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import {NgbCollapseModule} from '@ng-bootstrap/ng-bootstrap'
import {ChartConfiguration} from 'chart.js';
import {getColor} from '@/app/utils/color-utils';
//import {Chartjs} from '@app/components/chartjs';
import {CountUpModule} from 'ngx-countup';
import {currency} from '@/app/constants';

@Component({
  selector: 'app-user-profile',
  imports: [NgbCollapseModule,  CountUpModule],

  templateUrl: './user-profile.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserProfileComponent {
  randomData = Array.from({length: 15}, () => Math.floor(Math.random() * 46) + 5);
  userchartOptions = (): ChartConfiguration => ({
    type: 'bar',
    data: {
      labels: Array.from({length: 15}, (_, i) => `Label ${i + 1}`),
      datasets: [{
        data: this.randomData,
        backgroundColor: getColor('primary'),
        borderWidth: 0,
        barPercentage: 0.8,
        categoryPercentage: 1.0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: {
        x: {
          display: false,
          grid: {display: false}
        },
        y: {
          display: false,
          grid: {display: false}
        }
      },
      plugins: {
        legend: {display: false},
        tooltip: {enabled: false}
      }
    }
  })

  protected readonly currency = currency;
}
