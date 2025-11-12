import { DatePipe, NgForOf, NgIf } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { PageTitle } from '@app/components/page-title'
import { OficinaApiService } from '@core/services/oficina-api.service'
import { OrdemServico } from '@/app/types/oficina'

@Component({
  selector: 'app-servico',
  imports: [PageTitle, NgIf, NgForOf, DatePipe],
  templateUrl: './servico.html',
  styleUrl: './servico.scss'
})
export class Servico {
  private readonly api = inject(OficinaApiService)

  protected readonly ordens = signal<OrdemServico[]>([])
  protected readonly loading = signal(true)
  protected readonly error = signal<string | null>(null)

  constructor() {
    this.api
      .getOrdensServico()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (ordens) => {
          this.ordens.set(ordens)
          this.error.set(null)
          this.loading.set(false)
        },
        error: (err) => {
          console.error('Falha ao carregar ordens de serviço', err)
          this.ordens.set([])
          this.error.set('Não foi possível carregar as ordens de serviço.')
          this.loading.set(false)
        },
      })
  }

  protected trackByOrdem = (_: number, ordem: OrdemServico): string =>
    ordem.id?.toString() ?? ordem.ordemServicoId?.toString() ?? `${_}`

  protected readonly formatStatus = (status?: string): string =>
    status ? status.replaceAll('_', ' ').toUpperCase() : '—'
}
