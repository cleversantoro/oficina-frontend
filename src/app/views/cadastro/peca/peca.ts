import { DatePipe, DecimalPipe, NgClass, NgForOf, NgIf } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { PageTitle } from '@app/components/page-title'
import { OficinaApiService } from '@core/services/oficina-api.service'
import { Peca as PecaModel, PecaHistorico } from '@/app/types/oficina'

type PecaViewModel = PecaModel & {
  ultimoHistorico: PecaHistorico | null
}

@Component({
  selector: 'app-peca',
  imports: [PageTitle, NgIf, NgForOf, DecimalPipe, DatePipe, NgClass],
  templateUrl: './peca.html',
  styleUrl: './peca.scss'
})
export class Peca {
  private readonly api = inject(OficinaApiService)

  protected readonly pecas = signal<PecaViewModel[]>([])
  protected readonly loading = signal(true)
  protected readonly error = signal<string | null>(null)

  constructor() {
    this.api
      .getPecas()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (pecas) => {
          this.pecas.set(
            pecas.map((peca) => ({
              ...peca,
              ultimoHistorico: this.getUltimoHistorico(peca),
            }))
          )
          this.error.set(null)
          this.loading.set(false)
        },
        error: (err) => {
          console.error('Falha ao carregar pecas', err)
          this.pecas.set([])
          this.error.set('Nao foi possivel carregar as pecas cadastradas.')
          this.loading.set(false)
        },
      })
  }

  protected trackByPeca = (_: number, peca: PecaViewModel): string =>
    `${peca.peca_Id ?? peca.id ?? peca.codigo ?? _}`

  private getUltimoHistorico(peca: PecaModel): PecaHistorico | null {
    if (!peca.historicos?.length) {
      return null
    }

    return peca.historicos.reduce<PecaHistorico>((maisRecente, registro) => {
      const registroDate = new Date(registro.dataAlteracao).getTime()
      const maisRecenteDate = new Date(maisRecente.dataAlteracao).getTime()

      return registroDate > maisRecenteDate ? registro : maisRecente
    }, peca.historicos[0])
  }
}
