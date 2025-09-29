import { Component, OnDestroy, OnInit } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { LayoutStoreService } from '@core/services/layout-store.service'
import { SidenavComponent } from '@layouts/components/sidenav/sidenav.component'
import { Topbar } from '@layouts/components/topbar/topbar'
import { Footer } from '@layouts/components/footer/footer'
import { debounceTime, fromEvent, Subscription } from 'rxjs'

@Component({
  selector: 'app-vertical-layout',
  imports: [RouterOutlet, SidenavComponent, Topbar, Footer],
  templateUrl: './vertical-layout.html',
  styles: ``,
})
export class VerticalLayout implements OnInit, OnDestroy {
  constructor(public layout: LayoutStoreService) {}

  resizeSubscription!: Subscription

  ngOnInit() {
    this.onResize()

    this.resizeSubscription = fromEvent(window, 'resize')
      .pipe(debounceTime(200))
      .subscribe(() => this.onResize())
  }

  onResize(): void {
    const width = window.innerWidth

    if (width <= 1140) {
      this.layout.setSidenavSize('offcanvas')
    } else {
      this.layout.setSidenavSize('default')
    }
  }

  ngOnDestroy(): void {
    this.resizeSubscription?.unsubscribe()
  }
}
