import { CurrencyPipe, DatePipe, NgClass, NgForOf, NgIf } from '@angular/common'
import { Component, computed, inject, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { PageTitle } from '@app/components/page-title'
import { OficinaApiService } from '@core/services/oficina-api.service'
import { Cliente as ClienteModel } from '@/app/types/oficina'
import { CadClientePessoaTipo } from '@/app/types/oficina/cliente'

@Component({
  selector: 'app-cliente',
  imports: [PageTitle, NgIf, NgForOf, NgClass, DatePipe, CurrencyPipe],
  templateUrl: './cliente.html',
  styleUrl: './cliente.scss'
})
export class Cliente {
  private readonly api = inject(OficinaApiService)

  protected readonly clientes = signal<ClienteModel[]>([])
  protected readonly loading = signal(true)
  protected readonly error = signal<string | null>(null)

  protected readonly stats = computed(() => {
    const lista = this.clientes()
    const total = lista.length

    if (!total) {
      return { total: 0, pf: 0, pj: 0, vip: 0, ativos: 0 }
    }

    const pf = lista.filter((cliente) => this.getPessoaTipo(cliente) === 'PF').length
    const pj = lista.filter((cliente) => this.getPessoaTipo(cliente) === 'PJ').length
    const vip = lista.filter((cliente) => this.isVip(cliente)).length
    const ativos = lista.filter((cliente) => this.normalizeStatus(this.getStatus(cliente)) === 'ATIVO').length

    return { total, pf, pj, vip, ativos }
  })

  protected readonly resumoCards = computed(() => {
    const { total, ativos, pf, pj, vip } = this.stats()

    return [
      { label: 'Clientes', value: total },
      { label: 'Ativos', value: ativos },
      { label: 'Pessoas fisicas', value: pf },
      { label: 'Pessoas juridicas', value: pj },
      { label: 'Clientes VIP', value: vip },
    ]
  })

  protected readonly trackResumoCard = (_: number, card: { label: string }) => card.label

  protected getConsentimentos(cliente: ClienteModel) {
    return cliente.lgpd_consentimentos ?? cliente.lgpdConsentimentos ?? []
  }

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
          this.error.set('Nao foi possivel carregar os clientes.')
          this.loading.set(false)
        },
      })
  }

  protected trackByCliente = (_: number, cliente: ClienteModel): string =>
    (cliente.id ?? cliente.codigo ?? cliente.documento ?? cliente.documentoPrincipal ?? cliente.nome ?? `${_}`).toString()

  protected getNome(cliente: ClienteModel): string {
    return (
      cliente.nome_exibicao ??
      cliente.nomeExibicao ??
      cliente.nome ??
      cliente.nomeSocial ??
      'Cliente sem identificacao'
    )
  }

  protected getCodigo(cliente: ClienteModel): string {
    const codigo =
      cliente.codigo ??
      cliente.codigo_externo ??
      cliente.codigoExterno ??
      cliente.id

    return codigo !== undefined && codigo !== null ? `${codigo}` : '--'
  }

  protected getDocumento(cliente: ClienteModel): string {
    return (
      cliente.documento ??
      cliente.documentoPrincipal ??
      '--'
    )
  }

  protected getPessoaTipo(cliente: ClienteModel): CadClientePessoaTipo | undefined {
    return this.normalizePessoaTipo(cliente.pessoa_tipo ?? cliente.tipo)
  }

  protected getStatus(cliente: ClienteModel): string {
    return cliente.status ?? ''
  }

  protected getStatusLabel(cliente: ClienteModel): string {
    const label = this.getStatus(cliente)
    return label ? label : 'Sem status'
  }

  protected getStatusBadgeClass(cliente: ClienteModel): string {
    const status = this.normalizeStatus(this.getStatus(cliente))

    switch (status) {
      case 'ATIVO':
        return 'badge text-bg-success-subtle'
      case 'INATIVO':
        return 'badge text-bg-secondary-subtle'
      case 'SUSPENSO':
        return 'badge text-bg-warning-subtle'
      case 'BLOQUEADO':
        return 'badge text-bg-danger-subtle'
      default:
        return 'badge text-bg-secondary-subtle'
    }
  }

  protected isVip(cliente: ClienteModel): boolean {
    return Boolean(cliente.cliente_vip ?? cliente.vip)
  }

  protected getOrigem(cliente: ClienteModel): string {
    if (cliente.origem && 'nome' in cliente.origem) {
      return cliente.origem.nome || 'Nao informado'
    }

    if (cliente.origem_cadastro_id) {
      return `Origem #${cliente.origem_cadastro_id}`
    }

    return 'Nao informado'
  }

  protected getContatoOrdenado(cliente: ClienteModel) {
    return [...(cliente.contatos ?? [])].sort((a, b) => Number(b.preferido) - Number(a.preferido))
  }

  protected getEnderecoPrincipal(cliente: ClienteModel) {
    const enderecos = cliente.enderecos ?? []
    if (!enderecos.length) {
      return null
    }

    return enderecos.find((endereco) => endereco.principal) ?? enderecos[0]
  }

  protected getCreatedAt(cliente: ClienteModel): string | undefined {
    return cliente.created_at ?? cliente.createdAt ?? cliente.created_At ?? undefined
  }

  protected getUpdatedAt(cliente: ClienteModel): string | undefined {
    return cliente.updated_at ?? cliente.updatedAt ?? undefined
  }

  protected getObservacoes(cliente: ClienteModel): string {
    return cliente.observacoes ?? 'Sem observacoes adicionais.'
  }

  protected hasFinanceiro(cliente: ClienteModel): boolean {
    return Boolean(cliente.financeiro)
  }

  protected hasLgpd(cliente: ClienteModel): boolean {
    return Boolean(cliente.lgpd_consentimentos?.length || cliente.lgpdConsentimentos?.length)
  }

  protected hasAnexos(cliente: ClienteModel): boolean {
    return Boolean(cliente.anexos?.length)
  }

  protected hasDocumentos(cliente: ClienteModel): boolean {
    return Boolean(cliente.documentos?.length)
  }

  private normalizePessoaTipo(tipo: unknown): CadClientePessoaTipo | undefined {
    if (typeof tipo === 'string' && tipo.trim()) {
      const normalized = tipo.trim().toUpperCase()
      if (['PF', 'PESSOA_FISICA', 'FISICA'].includes(normalized)) {
        return 'PF'
      }

      if (['PJ', 'PESSOA_JURIDICA', 'JURIDICA'].includes(normalized)) {
        return 'PJ'
      }
    }

    if (typeof tipo === 'number') {
      if (tipo === 0 || tipo === 1) {
        return 'PF'
      }

      if (tipo >= 2) {
        return 'PJ'
      }
    }

    return undefined
  }

  private normalizeStatus(status?: string | null): string {
    if (typeof status === 'string') {
      return status.trim().toUpperCase();
    }
    return '';
  }
}
