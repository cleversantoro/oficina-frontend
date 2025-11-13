import { CurrencyPipe } from '@angular/common'
import { Component, computed, effect, inject, signal, Pipe } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { PageTitle } from '@app/components/page-title'
import { OficinaApiService } from '@core/services/oficina-api.service'
import {
  OrdemServico,
  OrdemServicoStatus,
  SaveOrdemServicoPayload,
} from '@/app/types/oficina'

type ModalType = 'create' | 'edit' | 'details' | 'delete'

@Component({
  selector: 'app-servico',
  imports: [PageTitle, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './servico.html',
  styleUrl: './servico.scss',
})
export class Servico {
  private readonly api = inject(OficinaApiService)
  private readonly fb = inject(FormBuilder)

  protected readonly ordens = signal<OrdemServico[]>([])
  protected readonly loading = signal(true)
  protected readonly saving = signal(false)
  protected readonly deleting = signal(false)
  protected readonly exporting = signal<'excel' | 'pdf' | null>(null)
  protected readonly error = signal<string | null>(null)
  protected readonly successMessage = signal<string | null>(null)
  protected readonly modalState = signal<ModalType | null>(null)
  protected readonly selected = signal<OrdemServico | null>(null)
  protected readonly searchTerm = signal('')
  protected readonly page = signal(1)
  protected readonly pageSize = signal(10)

  protected readonly statusOptions: OrdemServicoStatus[] = [
    'ABERTA',
    'EM_ANDAMENTO',
    'CONCLUIDA',
    'CANCELADA',
  ]
  protected readonly pageSizeOptions = [5, 10, 20]

  protected readonly ordemForm = this.fb.group({
    cliente_id: this.fb.control<number | null>(null, { validators: [Validators.required] }),
    mecanico_id: this.fb.control<number | null>(null, { validators: [Validators.required] }),
    descricao_Problema: this.fb.control('', { validators: [Validators.required, Validators.maxLength(500)], }),
    status: this.fb.control<OrdemServicoStatus>('ABERTA', { validators: [Validators.required] }),
    data_abertura: this.fb.control<string | null>(null),
    data_conclusao: this.fb.control<string | null>(null),
  })
  protected readonly formControls = this.ordemForm.controls

  protected readonly filteredOrdens = computed(() => {
    const term = this.searchTerm().trim().toLowerCase()
    if (!term) {
      return this.ordens()
    }

    return this.ordens().filter((ordem) => {
      const values = [
        ordem.id ?? ordem.ordemServicoId,
        ordem.cliente_Id,
        ordem.mecanico_Id,
        ordem.descricao_Problema,
        ordem.status,
      ]
      return values.some((value) => value?.toString().toLowerCase().includes(term))
    })
  })

  protected readonly totalPages = computed(() => {
    const total = this.filteredOrdens().length
    const size = this.pageSize()
    return Math.max(1, Math.ceil(total / size))
  })

  protected readonly paginatedOrdens = computed(() => {
    const current = this.page()
    const size = this.pageSize()
    const start = (current - 1) * size
    return this.filteredOrdens().slice(start, start + size)
  })

  protected readonly paginationInfo = computed(() => {
    const total = this.filteredOrdens().length
    const size = this.pageSize()
    const current = this.page()
    if (total === 0) {
      return { start: 0, end: 0, total }
    }

    const start = (current - 1) * size + 1
    const end = Math.min(current * size, total)
    return { start, end, total }
  })

  constructor() {
    effect(() => {
      const totalPages = this.totalPages()
      const current = this.page()
      if (current > totalPages) {
        queueMicrotask(() => this.page.set(totalPages))
      }
    })

    this.loadOrdens()
  }

  protected trackByOrdem = (_: number, ordem: OrdemServico): string =>
    String(ordem.id ?? ordem.ordemServicoId ?? _)

  protected openCreateModal(): void {
    this.selected.set(null)
    this.modalState.set('create')
    this.successMessage.set(null)
    this.error.set(null)
    this.resetForm()
  }

  protected openEditModal(ordem: OrdemServico): void {
    this.selected.set(ordem)
    this.modalState.set('edit')
    this.successMessage.set(null)
    this.error.set(null)
    this.ordemForm.reset({
      cliente_id: ordem.cliente_Id ?? null,
      mecanico_id: ordem.mecanico_Id ?? null,
      descricao_Problema: ordem.descricao_Problema ?? '',
      status: (ordem.status as OrdemServicoStatus) ?? 'ABERTA',
      data_abertura: this.toInputDate(ordem.data_Abertura),
      data_conclusao: this.toInputDate(ordem.data_Conclusao),
    })
  }

  protected openDetailsModal(ordem: OrdemServico): void {
    this.selected.set(ordem)
    this.modalState.set('details')
  }

  protected openDeleteModal(ordem: OrdemServico): void {
    this.selected.set(ordem)
    this.modalState.set('delete')
    this.error.set(null)
    this.successMessage.set(null)
  }

  protected closeModal(): void {
    const previous = this.modalState()
    this.modalState.set(null)
    if (previous === 'create' || previous === 'edit') {
      this.resetForm()
    }
    this.selected.set(null)
  }

  protected submitOrdem(): void {
    if (this.ordemForm.invalid) {
      this.ordemForm.markAllAsTouched()
      return
    }

    let payload: SaveOrdemServicoPayload
    try {
      payload = this.buildPayload()
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Falha ao preparar os dados da ordem de serviço.'
      this.error.set(message)
      return
    }

    const mode = this.modalState()
    let request$ = this.api.createOrdemServico(payload)
    if (mode === 'edit') {
      const ordemId = this.resolveSelectedId()
      if (ordemId === null) {
        this.error.set('Não foi possível identificar a ordem selecionada.')
        return
      }
      request$ = this.api.updateOrdemServico(ordemId, payload)
    }

    this.saving.set(true)
    request$.pipe(takeUntilDestroyed()).subscribe({
      next: (ordem) => {
        this.replaceOrAppend(ordem)
        this.successMessage.set(
          mode === 'edit' ? 'Ordem de serviço atualizada com sucesso.' : 'Ordem criada com sucesso.'
        )
        this.error.set(null)
        this.saving.set(false)
        this.closeModal()
      },
      error: (err) => {
        console.error('Falha ao salvar ordem de serviço', err)
        this.error.set('Não foi possível salvar a ordem. Verifique os dados e tente novamente.')
        this.saving.set(false)
      },
    })
  }

  protected confirmDelete(): void {
    if (this.deleting()) {
      return
    }
    const ordemId = this.resolveSelectedId()
    if (ordemId === null) {
      this.error.set('Não foi possível identificar a ordem selecionada.')
      return
    }

    this.deleting.set(true)
    this.api
      .deleteOrdemServico(ordemId)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: () => {
          this.ordens.update((lista) =>
            lista.filter((ordem) => this.resolveId(ordem) !== ordemId)
          )
          this.successMessage.set('Ordem de serviço removida com sucesso.')
          this.error.set(null)
          this.deleting.set(false)
          this.closeModal()
        },
        error: (err) => {
          console.error('Falha ao remover ordem de serviço', err)
          this.error.set('Não foi possível excluir a ordem neste momento.')
          this.deleting.set(false)
        },
      })
  }

  protected exportAsExcel(): void {
    this.generateExport('excel')
  }

  protected exportAsPdf(): void {
    this.generateExport('pdf')
  }

  protected handleSearch(term: string): void {
    this.searchTerm.set(term)
    this.page.set(1)
  }

  protected changePage(delta: number): void {
    const next = this.page() + delta
    if (next < 1 || next > this.totalPages()) {
      return
    }
    this.page.set(next)
  }

  protected setPage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return
    }
    this.page.set(page)
  }

  protected setPageSize(size: number): void {
    this.pageSize.set(size)
    this.page.set(1)
  }

  protected clearMessage(): void {
    this.successMessage.set(null)
  }

  protected formatDate(value?: string | null): string {
    if (!value) {
      return '--'
    }
    const date = new Date(value)
    return Number.isNaN(date.getTime()) ? '--' : date.toLocaleString()
  }

  protected badgeClass(status?: OrdemServicoStatus | string): string {
    switch (status) {
      case 'CONCLUIDA':
        return ' text-bg-success-subtle'
      case 'EM_ANDAMENTO':
        return ' text-bg-warning-subtle'
      case 'CANCELADA':
        return ' text-bg-danger-subtle'
      default:
        return ' text-bg-primary-subtle'
    }
  }

  protected formatCurrency(value?: number | string | null): string {
    if (value === null || value === undefined || value === '') {
      return '--'
    }
    const numericValue = typeof value === 'string' ? parseFloat(value) : value
    if (Number.isNaN(numericValue)) {
      return '--'
    }
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(numericValue)
  }

  private loadOrdens(): void {
    this.loading.set(true)
    this.api
      .getOrdensServico()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (ordens) => {
          this.ordens.set(this.sortOrdens(ordens))
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

  private resetForm(): void {
    this.ordemForm.reset({
      cliente_id: null,
      mecanico_id: null,
      descricao_Problema: '',
      status: 'ABERTA',
      data_abertura: null,
      data_conclusao: null,
    })
    this.ordemForm.markAsPristine()
    this.ordemForm.markAsUntouched()
  }

  private buildPayload(): SaveOrdemServicoPayload {
    const raw = this.ordemForm.value
    const payload: SaveOrdemServicoPayload = {
      cliente_id: this.ensureNumber(raw.cliente_id, 'cliente'),
      mecanico_id: this.ensureNumber(raw.mecanico_id, 'mecânico'),
      descricao_problema: this.requireText(raw.descricao_Problema),
      status: (raw.status as OrdemServicoStatus) ?? 'ABERTA',
    }

    const abertura = this.optionalDate(raw.data_abertura)
    if (abertura) {
      payload.data_abertura = abertura
    }

    const conclusao = this.optionalDate(raw.data_conclusao)
    if (conclusao !== null) {
      payload.data_conclusao = conclusao
    }

    return payload
  }

  private optionalDate(value: unknown): string | null {
    if (value === null || value === undefined || value === '') {
      return null
    }

    const date = new Date(value as string)
    if (Number.isNaN(date.getTime())) {
      throw new Error('Data inválida informada.')
    }
    return date.toISOString()
  }

  private ensureNumber(value: unknown, field: string): number {
    const parsed =
      typeof value === 'number'
        ? value
        : typeof value === 'string' && value.trim()
          ? Number(value)
          : NaN

    if (Number.isNaN(parsed)) {
      throw new Error(`Campo ${field} é obrigatório.`)
    }
    return parsed
  }

  private requireText(value: unknown): string {
    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
    throw new Error('Descrição do problema é obrigatória.')
  }

  private replaceOrAppend(ordem: OrdemServico): void {
    this.ordens.update((lista) => {
      const ordemId = this.resolveId(ordem)
      const index = lista.findIndex((item) => this.resolveId(item) === ordemId)
      if (index === -1) {
        return this.sortOrdens([...lista, ordem])
      }
      const updated = [...lista]
      updated.splice(index, 1, ordem)
      return this.sortOrdens(updated)
    })
  }

  private sortOrdens(ordens: OrdemServico[]): OrdemServico[] {
    return [...ordens].sort((a, b) => {
      const dateA = new Date(a.data_Abertura ?? a.created_At ?? '').getTime()
      const dateB = new Date(b.data_Abertura ?? b.created_At ?? '').getTime()
      return dateB - dateA
    })
  }

  private resolveSelectedId(): number | string | null {
    return this.resolveId(this.selected())
  }

  private resolveId(ordem: OrdemServico | null | undefined): number | string | null {
    if (!ordem) {
      return null
    }
    return ordem.id ?? ordem.ordemServicoId ?? ordem.ordem_servico_id ?? null
  }

  private toInputDate(value?: string | null): string | null {
    if (!value) {
      return null
    }
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) {
      return null
    }
    return date.toISOString().slice(0, 16)
  }

  private generateExport(type: 'excel' | 'pdf'): void {
    if (this.exporting() === type) {
      return
    }

    this.exporting.set(type)
    const rows = this.ordens().map((ordem) => ({
      id: this.resolveId(ordem),
      cliente: ordem.cliente_Id ?? '--',
      mecanico: ordem.mecanico_Id ?? '--',
      problema: ordem.descricao_Problema ?? '--',
      status: ordem.status ?? 'ABERTA',
      abertura: this.formatDate(ordem.data_Abertura),
      conclusao: this.formatDate(ordem.data_Conclusao),
    }))

    if (type === 'excel') {
      const headers = ['ID', 'Cliente', 'Mecânico', 'Problema', 'Status', 'Abertura', 'Conclusão']
      const csv = [
        headers.join(';'),
        ...rows.map((row) =>
          [
            row.id,
            row.cliente,
            row.mecanico,
            `"${row.problema}"`,
            row.status,
            row.abertura,
            row.conclusao,
          ].join(';')
        ),
      ].join('\n')
      this.downloadFile(csv, `ordens-servico-${Date.now()}.csv`, 'text/csv;charset=utf-8;')
      this.exporting.set(null)
      return
    } else {
      if (typeof window === 'undefined') {
        this.error.set('Exportação para PDF não suportada neste ambiente.')
        this.exporting.set(null)
        return
      }
      const popup = window.open('', '_blank', 'width=900,height=650')
      if (!popup) {
        this.error.set('Não foi possível abrir a janela de impressão.')
        this.exporting.set(null)
        return
      }

      const rowsHtml = rows
        .map(
          (row) => `
            <tr>
              <td>#${row.id}</td>
              <td>${row.cliente}</td>
              <td>${row.mecanico}</td>
              <td>${row.problema}</td>
              <td>${row.status}</td>
              <td>${row.abertura}</td>
              <td>${row.conclusao}</td>
            </tr>`
        )
        .join('')

      popup.document.write(`
        <html>
          <head>
            <title>Relatório de Ordens de Serviço</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 24px; }
              h1 { font-size: 20px; margin-bottom: 16px; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #ccc; padding: 8px; text-align: left; font-size: 12px; }
              th { background: #f1f5f9; }
            </style>
          </head>
          <body>
            <h1>Ordens de Serviço</h1>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Mecânico</th>
                  <th>Problema</th>
                  <th>Status</th>
                  <th>Abertura</th>
                  <th>Conclusão</th>
                </tr>
              </thead>
              <tbody>${rowsHtml}</tbody>
            </table>
          </body>
        </html>
      `)
      popup.document.close()
      popup.focus()
      popup.print()
      popup.close()
    }

    this.exporting.set(null)
  }

  private downloadFile(content: string, filename: string, type: string): void {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }
}
