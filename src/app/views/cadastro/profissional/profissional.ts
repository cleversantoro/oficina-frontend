import { NgForOf, NgIf } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { PageTitle } from '@app/components/page-title'
import { OficinaApiService } from '@core/services/oficina-api.service'
import { Mecanico } from '@/app/types/oficina'

@Component({
  selector: 'app-profissional',
  imports: [PageTitle, NgIf, NgForOf],
  templateUrl: './profissional.html',
  styleUrl: './profissional.scss'
})
export class Profissional {
  private readonly api = inject(OficinaApiService)

  protected readonly mecanicos = signal<Mecanico[]>([])
  protected readonly loading = signal(true)
  protected readonly error = signal<string | null>(null)

  constructor() {
    this.api
      .getMecanicos()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (mecanicos) => {
          this.mecanicos.set(mecanicos)
          this.error.set(null)
          this.loading.set(false)
        },
        error: (err) => {
          console.error('Falha ao carregar mecânicos', err)
          this.mecanicos.set([])
          this.error.set('Não foi possível carregar os profissionais.')
          this.loading.set(false)
        },
      })
  }

  protected trackByMecanico = (_: number, mecanico: Mecanico): string =>
    mecanico.id ?? mecanico.nomeCompleto ?? `${_}`
}
