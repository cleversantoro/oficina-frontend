import { DecimalPipe, NgForOf, NgIf } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { PageTitle } from '@app/components/page-title'
import { OficinaApiService } from '@core/services/oficina-api.service'
import { Peca as PecaModel } from '@/app/types/oficina'

@Component({
  selector: 'app-peca',
  imports: [PageTitle, NgIf, NgForOf, DecimalPipe],
  templateUrl: './peca.html',
  styleUrl: './peca.scss'
})
export class Peca {
  private readonly api = inject(OficinaApiService)

  protected readonly pecas = signal<PecaModel[]>([])
  protected readonly loading = signal(true)
  protected readonly error = signal<string | null>(null)

  constructor() {
    this.api
      .getPecas()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (pecas) => {
          this.pecas.set(pecas)
          this.error.set(null)
          this.loading.set(false)
        },
        error: (err) => {
          console.error('Falha ao carregar peças', err)
          this.pecas.set([])
          this.error.set('Não foi possível carregar as peças cadastradas.')
          this.loading.set(false)
        },
      })
  }

  protected trackByPeca = (_: number, peca: PecaModel): string =>
    peca.id ?? peca.codigo ?? `${_}`
}
