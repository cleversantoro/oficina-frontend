import { Component } from '@angular/core'
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import { SimplebarAngularModule } from 'simplebar-angular'
import { NgIcon, provideIcons } from '@ng-icons/core'
import { tablerX } from '@ng-icons/tabler-icons'
import { LayoutStoreService } from '@core/services/layout-store.service'
import { LayoutPositionType, LayoutSkinType, LayoutThemeType, SideNavType, TopBarType, } from '@/app/types/layout'
import { toPascalCase } from '@/app/utils/string-utils'

const light = 'assets/images/layouts/light.svg'
const dark = 'assets/images/layouts/dark.svg'

const lightTopBarImg = 'assets/images/layouts/topbar-light.svg'
const darkTopBarImg = 'assets/images/layouts/topbar-dark.svg'
const grayTopBarImg = 'assets/images/layouts/topbar-gray.svg'

const lightSideNavImg = 'assets/images/layouts/light.svg'
const darkSideNavImg = 'assets/images/layouts/sidenav-dark.svg'
const graySideNavImg = 'assets/images/layouts/sidenav-gray.svg'

const smallSideNavImg = 'assets/images/layouts/sidebar-condensed.svg'
const offcanvasSideNavImg = 'assets/images/layouts/sidebar-offcanvas.svg'


type ThemeOptionType = {
  theme: LayoutThemeType
  image: string
}

type TopBarColorOptionType = {
  color: TopBarType['color']
  image: string
}

type SideNavColorOptionType = {
  color: SideNavType['color']
  image: string
}

type SideNavSizeOptionType = {
  label: string
  size: SideNavType['size']
  image: string
}

@Component({
  selector: 'app-customizer',
  imports: [SimplebarAngularModule, NgIcon],
  templateUrl: './customizer.html',
  viewProviders: [provideIcons({ tablerX })],
})
export class Customizer {
  constructor(
    public activeOffcanvas: NgbActiveOffcanvas,
    public layout: LayoutStoreService
  ) { }

  close(): void {
    this.activeOffcanvas.close()
  }

  themeOptions: ThemeOptionType[] = [
    { theme: 'light', image: light },
    { theme: 'dark', image: dark },
  ]

  topBarColorOptions: TopBarColorOptionType[] = [
    { color: 'light', image: lightTopBarImg },
    { color: 'dark', image: darkTopBarImg },
    { color: 'gray', image: grayTopBarImg },
  ]

  sidenavColorOptions: SideNavColorOptionType[] = [
    { color: 'light', image: lightSideNavImg },
    { color: 'dark', image: darkSideNavImg },
    { color: 'gray', image: graySideNavImg },
  ]

  sidenavSizeOptions: SideNavSizeOptionType[] = [
    { size: 'default', image: lightSideNavImg, label: 'Default' },
    { size: 'collapse', image: smallSideNavImg, label: 'Collapse' },
    { size: 'offcanvas', image: offcanvasSideNavImg, label: 'Offcanvas' },
  ]

  layoutPositionOptions: { position: LayoutPositionType }[] = [
    { position: 'fixed' },
    { position: 'scrollable' },
  ]

  skinOptions: LayoutSkinType[] = ['default', 'two', 'three', 'four', 'five', 'six']
  protected readonly toPascalCase = toPascalCase
}
