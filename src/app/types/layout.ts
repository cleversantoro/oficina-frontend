import { LucideIconData } from 'lucide-angular';

export type LayoutSkinType =
  | 'default'
  | 'two'
  | 'three'
  | 'four'
  | 'five'
  | 'six'

export type LayoutThemeType = 'light' | 'dark' | 'system'

export type TopBarType = { color: 'light' | 'dark' | 'gray' }

export type SideNavType = {
  size: 'default' | 'collapse' | 'offcanvas'
  color: 'light' | 'dark' | 'gray'
  user: boolean
}

export type LayoutPositionType = 'fixed' | 'scrollable'

export type LayoutState = {
  skin: LayoutSkinType
  theme: LayoutThemeType
  position: LayoutPositionType
  topbar: TopBarType
  sidenav: SideNavType
  isLoading: boolean
}

export type MenuItemType = {
  label: string
  isTitle?: boolean
  icon?: LucideIconData
  url?: string
  badge?: {
    variant: string
    text: string
  }
  target?: string
  isDisabled?: boolean
  isSpecial?: boolean
  children?: MenuItemType[]
  isCollapsed?: boolean
}

export type LanguageOptionType = {
  code: string
  name: string
  nativeName: string
  flag: string
}
