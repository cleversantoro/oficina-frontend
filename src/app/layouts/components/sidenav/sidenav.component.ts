import {Component} from '@angular/core'
import {UserProfileComponent} from '@layouts/components/sidenav/components/user-profile/user-profile.component'
import {AppMenuComponent} from '@layouts/components/sidenav/components/app-menu/app-menu.component'
import {SimplebarAngularModule} from 'simplebar-angular'
import {LayoutStoreService} from '@core/services/layout-store.service'

@Component({
  selector: 'app-sidenav',
  imports: [
    UserProfileComponent,
    AppMenuComponent,
    SimplebarAngularModule,
  ],
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent {
  constructor(public layout: LayoutStoreService) {}

}
