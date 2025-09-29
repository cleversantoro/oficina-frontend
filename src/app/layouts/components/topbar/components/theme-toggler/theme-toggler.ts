import {Component} from '@angular/core'
import {LayoutStoreService} from '@core/services/layout-store.service'
import {LucideAngularModule, LucideMoon, LucideSun} from 'lucide-angular';

@Component({
  selector: 'app-theme-toggler',
  imports: [ LucideAngularModule],
  templateUrl: './theme-toggler.html',
})
export class ThemeToggler {
  constructor(public layout: LayoutStoreService) {}

  toggleTheme() {
    if (this.layout.theme === 'light') {
      this.layout.setTheme('dark')
    } else {
      this.layout.setTheme('light')
    }
  }

  protected readonly LucideMoon = LucideMoon;
  protected readonly LucideSun = LucideSun;
}
