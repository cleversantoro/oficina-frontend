import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  inject,
  ViewChild,
  AfterViewInit,
  HostListener,
} from '@angular/core'
import {
  BaseChartDirective,
  provideCharts,
  withDefaultRegisterables,
} from 'ng2-charts'
import { ChartConfiguration } from 'chart.js'
import { LayoutStoreService } from '@core/services/layout-store.service'
import { Subscription } from 'rxjs'
import { merge } from 'lodash-es'
import { getColor } from '@/app/utils/color-utils'

@Component({
  selector: 'app-chartjs',
  standalone: true,
  imports: [BaseChartDirective],
  providers: [provideCharts(withDefaultRegisterables())],
  template: `
    <canvas
      [height]="height"
      baseChart
      [data]="options.data"
      [options]="options.options"
      [type]="options.type"
      style="width:100%;display:block"
    ></canvas>
  `,
})
export class Chartjs implements OnInit, OnDestroy, AfterViewInit {
  @Input() getOptions!: () => ChartConfiguration
  @Input() height: number = 300

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective

  ngAfterViewInit(): void {
    setTimeout(() => this.chart?.chart?.resize(), 200)
  }

  @HostListener('window:resize')
  onWindowResize() {
    setTimeout(() => this.chart?.chart?.resize(), 200)
  }

  options!: ChartConfiguration
  private layoutSub!: Subscription

  get bodyFont() {
    return getComputedStyle(document.body).fontFamily.trim()
  }

  defaultOptions = (): ChartConfiguration['options'] => ({
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: -10
      }
    },
    scales: {
      x: {
        ticks: {
          font: { family: this.bodyFont },
          color: getColor('secondary-color'),
          display: true,
        },
        grid: {
          display: false,
        },
        border: {
          display: false
        }
      },
      y: {
        ticks: {
          font: { family: this.bodyFont },
          color: getColor('secondary-color')
        },
        grid: {
          display: true,
          color: getColor('chart-border-color'),
          lineWidth: 1
        },
        border: {
          display: false,
          dash: [5, 5]
        }
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: { family: this.bodyFont },
          color: getColor('secondary-color'),
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          boxHeight: 8,
          padding: 15,
        }
      },
      tooltip: {
        enabled: true,
        titleFont: { family: this.bodyFont },
        bodyFont: { family: this.bodyFont }
      }
    }
  })

  layout = inject(LayoutStoreService)

  ngOnInit(): void {
    this.setChartOptions()

    // Refresh chart on theme/skin change
    this.layoutSub = this.layout.layoutState$.subscribe(() => {
      this.setChartOptions()
    })
  }

  ngOnDestroy(): void {
    this.layoutSub?.unsubscribe()
  }

  private setChartOptions() {
    const chartConfig = this.getOptions()
    chartConfig.options = merge({}, this.defaultOptions(), chartConfig.options)

    if (chartConfig.options?.scales) {
      if (chartConfig.options.scales['x']) {
        chartConfig.options.scales['x'].type = 'category'
      }
      if (chartConfig.options.scales['y']) {
        chartConfig.options.scales['y'].type = 'linear'
      }
    }

    this.options = chartConfig
    setTimeout(() => this.chart?.chart?.resize(), 200)
  }
}
