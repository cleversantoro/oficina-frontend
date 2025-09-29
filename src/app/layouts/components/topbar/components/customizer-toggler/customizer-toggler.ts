import {Component} from '@angular/core'
import {LayoutStoreService} from '@core/services/layout-store.service'
import {LucideAngularModule, LucideSettings} from 'lucide-angular';

@Component({
  selector: 'app-customizer-toggler',
  imports: [LucideAngularModule],
  templateUrl: './customizer-toggler.html',
})
export class CustomizerToggler {
  constructor(public layout: LayoutStoreService) {}

  protected readonly LucideSettings = LucideSettings;
}
