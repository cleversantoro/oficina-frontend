import { MenuItemType } from '@/app/types/layout'
import {
  LucideCalendar,
  LucideLayoutDashboard,
  LucidePencil,
  Wrench
} from 'lucide-angular';

//import { LucideAngularModule, Wrench } from 'lucide-angular';

type UserDropdownItemType = {
  label?: string
  icon?: string
  url?: string
  isDivider?: boolean
  isHeader?: boolean
  class?: string
}

export const userDropdownItems: UserDropdownItemType[] = [
  {
    label: 'Welcome back!',
    isHeader: true,
  },
  {
    label: 'Profile',
    icon: 'tablerUserCircle',
    url: 'pages-profile.html',
  },
  {
    label: 'Notifications',
    icon: 'tablerBellRinging',
    url: '#',
  },
  {
    label: 'Balance: $985.25',
    icon: 'tablerCreditCard',
    url: '#',
  },
  {
    label: 'Account Settings',
    icon: 'tablerSettings2',
    url: '#',
  },
  {
    label: 'Support Center',
    icon: 'tablerHeadset',
    url: '#',
  },
  {
    isDivider: true,
  },
  {
    label: 'Lock Screen',
    icon: 'tablerLock',
    url: 'auth-lock-screen.html',
  },
  {
    label: 'Log Out',
    icon: 'tablerLogout2',
    url: '#',
    class: 'fw-semibold text-danger',
  },
]

export const menuItems: MenuItemType[] = [
  { label: 'Dashboard', icon: LucideLayoutDashboard, url: '/dashboard' },
  { label: 'Agenda', icon: LucideCalendar, url: '/agenda' },
  //{label: 'File Manager', icon: LucideFolderClosed, url: '/file-manager'},
  //{ label: 'Cadastro', icon: LucideCalendar, url: '/calendar' },
  {
    label: 'Cadastro',
    icon: LucidePencil,
    isCollapsed: true,
    children: [
      { label: 'Clientes', url: '/cliente' },
      { label: 'Profissionais', url: '/profissional' },
      { label: 'Peça', url: '/peca' },
      { label: 'Veiculos', url: '/veiculo' },
    ]
  },

  {
    label: 'Ordem Serviço',
    icon: Wrench,
    isCollapsed: true,
    children: [
      { label: 'Serviços', url: '/servico' },
    ]
  },
  // {
  //   label: 'Chat',
  //   icon: LucideMessagesSquare,
  //   url: '/chat',
  // },
  // {
  //   label: 'Other Apps',
  //   icon: LucideLayoutGrid,
  //   isCollapsed: true,
  //   children: [
  //     {label: 'Contacts', url: '/other-apps/contacts'},
  //     {label: 'Projects', url: '/other-apps/projects'},
  //     {label: 'Outlook View', url: '/other-apps/outlook-view'},
  //     {label: 'API Keys', url: '/other-apps/api-keys'},
  //     {label: 'Pin Board', url: '/other-apps/pin-board'},
  //     {label: 'Forum View', url: '/other-apps/forum-view'},
  //     {label: 'Forum Post', url: '/other-apps/forum-post'},
  //   ]
  // },
  // {
  //   label: 'Landing Page',
  //   icon: LucidePresentation,
  //   badge: {text: 'New', variant: 'warning'},
  //   url: '/landing',
  // },
  { label: 'Custom Pages', isTitle: true },
  // {
  //   label: 'Pages',
  //   icon: LucideNotebookText,
  //   isCollapsed: true,
  //   children: [
  //     {label: 'Profile', url: '/pages/profile'},
  //     {label: 'FAQ', url: '/pages/faq'},
  //     {label: 'Pricing', url: '/pages/pricing'},
  //     {label: 'Empty Page', url: '/pages/empty'},
  //     {label: 'Timeline', url: '/pages/timeline'},
  //     {label: 'Search Results', url: '/pages/search-results'},
  //     {label: 'Coming Soon', url: '/coming-soon'},
  //     {label: 'Terms & Conditions', url: '/pages/terms-and-conditions'},
  //   ],
  // },
  // {
  //   label: 'Miscellaneous',
  //   icon: LucideBlocks,
  //   isCollapsed: true,
  //   children: [
  //     {label: 'Sweet Alerts', url: '/miscellaneous/sweet-alerts'},
  //     {label: 'Password Meter', url: '/miscellaneous/password-meter'},
  //     {label: 'Clipboard', url: '/miscellaneous/clipboard'},
  //     {label: 'Gallery', url: '/miscellaneous/gallery'},
  //     {label: 'Masonry', url: '/miscellaneous/masonry'},
  //     {label: 'Tour', url: '/miscellaneous/tour'},
  //     {label: 'Preloader', url: '/miscellaneous/preloader'},

  //   ]
  // },
  // {
  //   label: 'Authentication',
  //   icon: LucideFingerprint,
  //   isCollapsed: true,
  //   children: [
  //     {label: 'Sign In', url: '/auth/sign-in'},
  //     {label: 'Sign Up', url: '/auth/sign-up'},
  //     {label: 'Reset Password', url: '/auth/reset-password'},
  //     {label: 'New Password', url: '/auth/new-password'},
  //     {label: 'Two Factor', url: '/auth/two-factor'},
  //     {label: 'Lock Screen', url: '/auth/lock-screen'},
  //     {label: 'Success Mail', url: '/auth/success-mail'},
  //     {label: 'Login with PIN', url: '/auth/login-pin'},
  //     {label: 'Delete Account', url: '/auth/delete-account'},

  //   ],
  // },
  // {
  //   label: 'Error Pages',
  //   icon: LucideShieldBan,
  //   isCollapsed: true,
  //   children: [
  //     {label: '400', url: '/error/400'},
  //     {label: '401', url: '/error/401'},
  //     {label: '403', url: '/error/403'},
  //     {label: '404', url: '/error/404'},
  //     {label: '408', url: '/error/408'},
  //     {label: '500', url: '/error/500'},
  //     {label: 'Maintenance', url: '/maintenance'},
  //   ]
  // },
  { label: 'Layouts', isTitle: true },
  // {
  //   label: 'Sidebars',
  //   icon: LucidePanelLeftDashed,
  //   isCollapsed: true,
  //   children: [
  //     {label: 'Dark Menu', url: '/layouts/sidebars/dark'},
  //     {label: 'Gray Menu', url: '/layouts/sidebars/gray'},

  //   ]
  // },
  // {
  //   label: 'Topbars',
  //   icon: LucidePanelTopDashed,
  //   isCollapsed: true,
  //   children: [
  //     {label: 'Dark Topbar', url: '/layouts/topbars/dark'},
  //     {label: 'Gray Topbar', url: '/layouts/topbars/gray'},
  //   ]
  // },
  { label: 'Components', isTitle: true },
  // {
  //   label: 'Base UI',
  //   icon: LucideCookie,
  //   isCollapsed: true,
  //   children: [
  //     {label: 'Accordions', url: '/ui/accordions'},
  //     {label: 'Alerts', url: '/ui/alerts'},
  //     {label: 'Images', url: '/ui/images'},
  //     {label: 'Badges', url: '/ui/badges'},
  //     {label: 'Breadcrumb', url: '/ui/breadcrumb'},
  //     {label: 'Buttons', url: '/ui/buttons'},
  //     {label: 'Cards', url: '/ui/cards'},
  //     {label: 'Carousel', url: '/ui/carousel'},
  //     {label: 'Collapse', url: '/ui/collapse'},
  //     {label: 'Colors', url: '/ui/colors'},
  //     {label: 'Dropdowns', url: '/ui/dropdowns'},
  //     {label: 'Videos', url: '/ui/videos'},
  //     {label: 'Grid Options', url: '/ui/grid-options'},
  //     {label: 'Links', url: '/ui/links'},
  //     {label: 'List Group', url: '/ui/list-groups'},
  //     {label: 'Modals', url: '/ui/modals'},
  //     {label: 'Notifications', url: '/ui/notifications'},
  //     {label: 'Offcanvas', url: '/ui/offcanvas'},
  //     {label: 'Placeholders', url: '/ui/placeholders'},
  //     {label: 'Pagination', url: '/ui/pagination'},
  //     {label: 'Popovers', url: '/ui/popovers'},
  //     {label: 'Progress', url: '/ui/progress'},
  //     {label: 'Srollspy', url: '/ui/scrollspy'},
  //     {label: 'Spinners', url: '/ui/spinners'},
  //     {label: 'Tabs', url: '/ui/tabs'},
  //     {label: 'Tooltips', url: '/ui/tooltips'},
  //     {label: 'Typography', url: '/ui/typography'},
  //     {label: 'Utilities', url: '/ui/utilities'},
  //   ]
  // },
  // {
  //   label: 'Widgets',
  //   icon: LucideRatio,
  //   url: '/widgets',
  // },
  // {
  //   label: 'Chart JS',
  //   icon: LucideChartPie,
  //   isCollapsed: true,
  //   children: [
  //     {label: 'Area', url: '/chartjs/area'},
  //     {label: 'Bar', url: '/chartjs/bar'},
  //     {label: 'Line', url: '/chartjs/line'},
  //     {label: 'Other', url: '/chartjs/other'},
  //   ]
  // },
  // {
  //   label: 'Forms',
  //   icon: LucideSquarePi,
  //   isCollapsed: true,
  //   children: [
  //     {
  //       label: 'Basic Elements',
  //       url: '/forms/basic',
  //     },
  //     {
  //       label: 'Form Plugins',
  //       url: '/forms/plugins',
  //     },
  //     {
  //       label: 'Validation',
  //       url: '/forms/validation',
  //     },
  //     {
  //       label: 'Wizard',
  //       url: '/forms/wizard',
  //     },
  //     {
  //       label: 'File Uploads',
  //       url: '/forms/file-uploads',
  //     },
  //     {
  //       label: 'Quill Editor',
  //       url: '/forms/editors',
  //     },
  //   ],
  // },
  // {
  //   label: 'Tables',
  //   icon: LucideTable2,
  //   isCollapsed: true,
  //   children: [
  //     {label: 'Static Tables', url: '/tables/static'},
  //     {label: 'Custom Tables', url: '/tables/custom'},
  //     {
  //       label: 'Data Tables',
  //       isCollapsed: true,
  //       badge: {text: '11', variant: 'success'},
  //       children: [
  //         {label: 'Basic', url: '/data-tables/basic'},
  //         {label: 'Export Data', url: '/data-tables/export-data'},
  //         {label: 'Select', url: '/data-tables/select'},
  //         {label: 'Ajax', url: '/data-tables/ajax'},
  //         {label: 'Javascript Source', url: '/data-tables/javascript-source'},
  //         {label: 'Data Rendering', url: '/data-tables/data-rendering'},
  //         {label: 'Scroll', url: '/data-tables/scroll'},
  //         {label: 'Show & Hide Column', url: '/data-tables/columns'},
  //         {label: 'Child Rows', url: '/data-tables/child-rows'},
  //         {label: 'Column Searching', url: '/data-tables/column-search'},
  //         {label: 'Fixed Header', url: '/data-tables/fixed-header'},
  //       ]
  //     },
  //   ]
  // },
  // {
  //   label: 'Icons',
  //   icon: LucidePaintBucket,
  //   isCollapsed: true,
  //   children: [
  //     {
  //       label: 'Tabler',
  //       url: '/icons/tabler',
  //     },
  //     {
  //       label: 'Lucide',
  //       url: '/icons/lucide',
  //     },
  //     {
  //       label: 'Flags',
  //       url: '/icons/flags',
  //     },
  //   ],
  // },
  // {
  //   label: 'Maps',
  //   icon: LucideMap,
  //   isCollapsed: true,
  //   children: [
  //     {label: 'Google Maps', url: '/maps/google'},
  //     {
  //       label: 'Vector Maps',
  //       url: '/maps/vector',
  //     },
  //     {
  //       label: 'Leaflet Maps',
  //       url: '/maps/leaflet',
  //     },
  //   ],
  // },
  { label: 'Menu Items', isTitle: true },
  // {
  //   label: 'Menu Levels',
  //   icon: LucideCommand,
  //   isCollapsed: true,
  //   children: [
  //     {
  //       label: 'Second Level',
  //       children: [
  //         {label: 'Item 2.1', url: 'javascript: void(0);'},
  //         {label: 'Item 2.2', url: 'javascript: void(0);'},
  //       ],
  //     },
  //     {
  //       label: 'Third Level',
  //       isCollapsed: true,
  //       children: [
  //         {label: 'Item 1', url: 'javascript: void(0);'},
  //         {
  //           label: 'Item 2',
  //           children: [
  //             {
  //               label: 'Item 3.1',
  //               url: 'javascript: void(0);',
  //             },
  //             {
  //               label: 'Item 3.2',
  //               url: '',
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   label: 'Disabled Menu',
  //   icon: LucidePencilOff,
  //   url: '/',
  //   isDisabled: true,
  // },
]
