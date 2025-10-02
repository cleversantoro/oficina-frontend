import { DatePipe, NgForOf, NgIf } from '@angular/common'
import { Component, inject, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { PageTitle } from '@app/components/page-title'
import { OficinaApiService } from '@core/services/oficina-api.service'
import { Cliente as ClienteModel } from '@/app/types/oficina'

@Component({
  selector: 'app-cliente',
  imports: [PageTitle, NgIf, NgForOf, DatePipe],
  templateUrl: './cliente.html',
  styleUrl: './cliente.scss'
})
export class Cliente {
  private readonly api = inject(OficinaApiService)

  protected readonly clientes = signal<ClienteModel[]>([])
  protected readonly loading = signal(true)
  protected readonly error = signal<string | null>(null)

  constructor() {
    this.api
      .getClientes()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (clientes) => {
          this.clientes.set(clientes)
          this.error.set(null)
          this.loading.set(false)
        },
        error: (err) => {
          console.error('Falha ao carregar clientes', err)
          this.clientes.set([])
          this.error.set('Não foi possível carregar os clientes.')
          this.loading.set(false)
        },
      })
  }

  protected trackByCliente = (_: number, cliente: ClienteModel): string =>
    cliente.id ?? cliente.documento ?? `${_}`
}
