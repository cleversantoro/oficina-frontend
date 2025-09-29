import {Component} from '@angular/core'
import {RouterLink} from '@angular/router'
import {LayoutStoreService} from '@core/services/layout-store.service'
import {LanguageDropdown} from '@layouts/components/topbar/components/language-dropdown/language-dropdown'
import {ThemeToggler} from '@layouts/components/topbar/components/theme-toggler/theme-toggler'
import {CustomizerToggler} from '@layouts/components/topbar/components/customizer-toggler/customizer-toggler'
import {UserProfile} from '@layouts/components/topbar/components/user-profile/user-profile'
import {NotificationDropdown} from '@layouts/components/topbar/components/notification-dropdown/notification-dropdown'
import {NgbDropdownModule,} from '@ng-bootstrap/ng-bootstrap'
//import {MegaMenu} from '@layouts/components/topbar/components/mega-menu/mega-menu';
import {LucideAngularModule, LucideAudioLines, LucideMenu, LucideSearch} from 'lucide-angular';

@Component({
  selector: 'app-topbar',
  imports: [
    RouterLink,
    NgbDropdownModule,
    LanguageDropdown,
    CustomizerToggler,
    ThemeToggler,
    UserProfile,
    NotificationDropdown,
    //MegaMenu,
    LucideAngularModule,
  ],
  templateUrl: './topbar.html',
})
export class Topbar {
  constructor(public layout: LayoutStoreService) {}

  toggleSidebar() {
    const html = document.documentElement
    const currentSize = html.getAttribute('data-sidenav-size')
    const savedSize = this.layout.sidenavSize

    if (currentSize === 'offcanvas') {
      html.classList.toggle('sidebar-enable')
      this.layout.showBackdrop()
    } else {
      this.layout.setSidenavSize(
        currentSize === 'collapse' ? 'default' : 'collapse'
      )
    }
  }

  protected readonly LucideAudioLines = LucideAudioLines;
  protected readonly LucideMenu = LucideMenu;
  protected readonly LucideSearch = LucideSearch;
}
