import {Component, Input} from '@angular/core';
import {LucideAngularModule, LucideMonitor} from 'lucide-angular';
import {CountUpModule} from 'ngx-countup';

@Component({
  selector: 'app-widget-card3',
  imports: [
    LucideAngularModule,
    CountUpModule
  ],
  template: `
    <div class="card card-h-100">
      <div class="card-body">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h5 class="fw-normal text-uppercase mb-3">{{ title }}</h5>
            <h2 class="fw-light mb-1"><span [countUp]="count" [options]="{suffix:'k',duration:0.7}">0</span></h2>
            <p class="mb-3">{{ subTitle }}</p>
            <p class="text-muted mb-0" [innerHTML]="description">
            </p>
          </div>
          <div>
            <lucide-angular [img]="LucideMonitor" class="text-muted fs-42 svg-sw-10"/>
          </div>
        </div>
      </div>
      <div class="card-footer text-muted text-center">
        {{ footerTitle }}
      </div>
    </div>
  `,
  styles: ``
})
export class WidgetCard3 {
  @Input() title: string = 'Page Views';
  @Input() subTitle: string = 'Across all platforms';
  @Input() footerTitle: string = '8,400 unique visitors today';
  @Input() count: number = 982;
  @Input() description: string = "Traffic increased by <strong>12%</strong> compared to last week. Majority of views came from <strong>mobile devices</strong>.";

  protected readonly LucideMonitor = LucideMonitor;
}
