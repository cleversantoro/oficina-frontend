import { Component } from '@angular/core'
import { RouterLink } from '@angular/router'
import { NgIcon } from '@ng-icons/core'
import {
  NgbDropdown,
  NgbDropdownMenu,
  NgbDropdownToggle,
} from '@ng-bootstrap/ng-bootstrap'
import {LucideAngularModule, LucideLayers2} from 'lucide-angular';

type MegaMenuType = {
  title: string
  links: {
    label: string
    url: string
  }[]
}

@Component({
  selector: 'app-mega-menu',
  imports: [
    RouterLink,
    NgIcon,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownMenu,
    LucideAngularModule,
  ],
  templateUrl: './mega-menu.html',
})
export class MegaMenu {
  megaMenuItems: MegaMenuType[] = [
    {
      title: 'Dashboard & Analytics',
      links: [
        {label: 'Sales Dashboard', url: '#;'},
        {label: 'Marketing Dashboard', url: '#;'},
        {label: 'Finance Overview', url: '#;'},
        {label: 'User Analytics', url: '#;'},
        {label: 'Traffic Insights', url: '#;'},

      ]
    },
    {
      title: 'Project Management',
      links: [
        {label: 'Task Overview', url: '#;'},
        {label: 'Kanban Board', url: '#;'},
        {label: 'Gantt Chart', url: '#;'},
        {label: 'Team Collaboration', url: '#;'},
        {label: 'Project Milestones', url: '#;'},

      ]
    },
    {
      title: 'User Management',
      links: [
        {label: 'User Profiles', url: '#;'},
        {label: 'Access Control', url: '#;'},
        {label: 'Role Permissions', url: '#;'},
        {label: 'Activity Logs', url: '#;'},
        {label: 'Security Settings', url: '#;'},

      ]
    }
  ];
  protected readonly LucideLayers2 = LucideLayers2;
}
