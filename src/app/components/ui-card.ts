import {ChangeDetectorRef, Component, Input} from '@angular/core'
import { NgIcon } from '@ng-icons/core'
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-ui-card',
  imports: [NgIcon, NgbCollapse],
  template: `
    @if (isVisible) {
      <div
        class="card {{ isCollapsed ? 'card-collapse' : '' }} {{ className }}"
      >
        <div
          class="card-header justify-content-between align-items-center"
          [class]="isCollapsed ? 'border-0' : ''"
        >
          <h5 class="card-title" [class]="titleClass">
            {{ title }}
            <ng-content select="[badge-text]"></ng-content>
          </h5>
          <div>
            @if (isTogglable || isReloadable || isCloseable) {
              <div class="card-action">
                @if (isTogglable) {
                  <button
                    (click)="isCollapsed = !isCollapsed"
                    class="card-action-item border-0 d-flex align-items-center justify-content-center"
                  >
                    @if (!isCollapsed) {
                      <ng-icon name="tablerChevronUp"/>
                    }
                    @if (isCollapsed) {
                      <ng-icon name="tablerChevronDown"/>
                    }
                  </button>
                }
                @if (isReloadable) {
                  <button (click)="reload()" class="card-action-item border-0 d-flex align-items-center justify-content-center">
                    <ng-icon name="tablerRefresh"/>
                  </button>
                }
                @if (isCloseable) {
                  <button (click)="close()" class="card-action-item border-0 d-flex align-items-center justify-content-center">
                    <ng-icon name="tablerX"/>
                  </button>
                }
              </div>
            }
            <ng-content select="[helper-text]"></ng-content>
          </div>
        </div>
        <div #collapse="ngbCollapse"
             [(ngbCollapse)]="isCollapsed">
          <div
            class="{{noCardBody ? '' : 'card-body'}} {{ bodyClass }}"
          >
            <ng-content select="[card-body]"></ng-content>
          </div>

          <ng-content select="[card-footer]"></ng-content>
        </div>

        @if (isReloading) {
          <div class="card-overlay d-flex">
            <div class="spinner-border text-primary"></div>
          </div>
        }
      </div>
    }
  `,
})
export class UiCard {
  @Input() title!: string
  @Input() isTogglable?: boolean
  @Input() isReloadable?: boolean
  @Input() isCloseable?: boolean
  @Input() bodyClass?: string
  @Input() className?: string
  @Input() titleClass?: string
  @Input() noCardBody?: boolean

  isCollapsed = false
  isReloading = false
  isVisible = true
  constructor(private cdr: ChangeDetectorRef) {}

  reload() {
    this.isReloading = true
   setTimeout(()=>{
     this.isReloading = false
     this.cdr.markForCheck();
   },1000)
  }


  close() {
    this.isVisible = false
  }
}
