import { NgClass, NgForOf, NgIf } from '@angular/common'
import { Component, computed, effect, inject, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { PageTitle } from '@app/components/page-title'
import { OficinaApiService } from '@core/services/oficina-api.service'
import { CadClientePessoaTipo, Cliente as ClienteModel } from '@/app/types/oficina'

type ClienteTab = 'dados' | 'endereco' | 'contatos' | 'documentos' | 'lgpd' | 'financeiro' | 'anexos'

@Component({
  selector: 'app-cliente',
  imports: [PageTitle,  ReactiveFormsModule],
  templateUrl:'./cliente.html',
  styleUrl: './cliente.scss',
})
export class Cliente {
  private readonly api = inject(OficinaApiService)
  private readonly fb = inject(FormBuilder)
  private readonly clienteKeys = new WeakMap<ClienteModel, string>()

  protected readonly clientes = signal<ClienteModel[]>([])
  protected readonly loading = signal(true)
  protected readonly error = signal<string | null>(null)
  protected readonly searchTerm = signal('')
  protected readonly page = signal(1)
  protected readonly pageSize = signal(25)
  protected readonly pageSizeOptions = [10, 25, 50, 100]
  protected readonly selectedClientes = signal<Set<string>>(new Set())
  protected readonly viewMode = signal<'list' | 'form'>('list')
  protected readonly activeTab = signal<ClienteTab>('dados')
  protected readonly filtrosAbertos = signal(false)
  protected readonly formFeedback = signal<string | null>(null)

  protected readonly clienteTabs: Array<{ id: ClienteTab; label: string }> = [
    { id: 'dados', label: 'Dados gerais' },
    { id: 'endereco', label: 'Enderecos' },
    { id: 'contatos', label: 'Contatos' },
    { id: 'documentos', label: 'Documentos' },
    { id: 'lgpd', label: 'LGPD' },
    { id: 'financeiro', label: 'Financeiro' },
    { id: 'anexos', label: 'Anexos' },
  ]

  protected readonly clienteForm = this.fb.group({
    tipoPessoa: this.fb.control<'PF' | 'PJ'>('PF', { nonNullable: true, validators: [Validators.required] }),
    status: this.fb.control('ATIVO', { nonNullable: true, validators: [Validators.required] }),
    nome: this.fb.control('', { validators: [Validators.required, Validators.minLength(3)] }),
    documento: this.fb.control('', { validators: [Validators.required] }),
    telefone: this.fb.control(''),
    email: this.fb.control('', { validators: [Validators.email] }),
    origem: this.fb.control(''),
    vip: this.fb.control(false, { nonNullable: true }),
    observacoes: this.fb.control(''),
    cep: this.fb.control(''),
    endereco: this.fb.control(''),
    numero: this.fb.control(''),
    complemento: this.fb.control(''),
    bairro: this.fb.control(''),
    cidade: this.fb.control(''),
    estado: this.fb.control(''),
    contatoTipo: this.fb.control('Telefone'),
    contatoNome: this.fb.control(''),
    contatoTelefone: this.fb.control(''),
    contatoEmail: this.fb.control('', { validators: [Validators.email] }),
    documentoTipo: this.fb.control('RG'),
    documentoEmissor: this.fb.control(''),
    documentoVencimento: this.fb.control(''),
    lgpdConsentimento: this.fb.control(false, { nonNullable: true }),
    lgpdCanal: this.fb.control(''),
    lgpdData: this.fb.control(''),
    financeiroLimite: this.fb.control<number | null>(null),
    financeiroFormaPagamento: this.fb.control(''),
  })

  protected readonly formControls = this.clienteForm.controls

  protected readonly filteredClientes = computed(() => {
    const termo = this.searchTerm().trim().toLowerCase()
    const lista = this.clientes()
    if (!termo) {
      return lista
    }

    return lista.filter((cliente) => {
      const texto = [
        this.getNome(cliente),
        this.getDocumento(cliente),
        this.getTelefone(cliente),
        this.getStatusLabel(cliente),
        this.getCodigo(cliente),
        cliente.email ?? '',
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      return texto.includes(termo)
    })
  })

  protected readonly pagedClientes = computed(() => {
    const page = this.page()
    const size = this.pageSize()
    const start = (page - 1) * size
    const end = start + size
    return this.filteredClientes().slice(start, end)
  })

  protected readonly totalPages = computed(() => {
    const total = this.filteredClientes().length
    const size = this.pageSize()
    if (!size) {
      return 1
    }
    return Math.max(1, Math.ceil(total / size))
  })

  protected readonly pageWindow = computed(() => {
    const total = this.totalPages()
    const current = this.page()
    const windowSize = 5
    const half = Math.floor(windowSize / 2)
    let start = Math.max(1, current - half)
    let end = Math.min(total, start + windowSize - 1)
    start = Math.max(1, end - windowSize + 1)
    const pages: number[] = []
    for (let page = start; page <= end; page += 1) {
      pages.push(page)
    }
    return pages
  })

  protected readonly paginationInfo = computed(() => {
    const total = this.filteredClientes().length
    if (!total) {
      return { start: 0, end: 0, total: 0 }
    }
    const size = this.pageSize()
    const current = this.page()
    const start = (current - 1) * size + 1
    const end = Math.min(current * size, total)
    return { start, end, total }
  })

  protected readonly emptyStateMessage = computed(() =>
    this.searchTerm().trim()
      ? 'Nenhum cliente encontrado para o termo informado.'
      : 'Nenhum cliente cadastrado no momento.'
  )

  protected readonly selectionStatus = computed(() => {
    const visiveis = this.pagedClientes()
    if (!visiveis.length) {
      return { all: false, indeterminate: false }
    }

    const selecionados = this.selectedClientes()
    let count = 0
    for (const cliente of visiveis) {
      if (selecionados.has(this.clienteKey(cliente))) {
        count += 1
      }
    }

    return {
      all: count === visiveis.length,
      indeterminate: count > 0 && count < visiveis.length,
    }
  })

  constructor() {
    this.loadClientes()

    effect(() => {
      const total = this.totalPages()
      const current = this.page()
      if (current > total) {
        this.page.set(total)
      } else if (current < 1) {
        this.page.set(1)
      }
    })
  }

  protected trackByCliente = (_: number, cliente: ClienteModel): string => this.clienteKey(cliente)

  protected handleSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement | null)?.value ?? ''
    this.searchTerm.set(value)
    this.page.set(1)
  }

  protected clearSearch(): void {
    this.searchTerm.set('')
    this.page.set(1)
  }

  protected goToPage(page: number): void {
    const total = this.totalPages()
    if (page < 1 || page > total) {
      return
    }
    this.page.set(page)
  }

  protected previousPage(): void {
    this.goToPage(this.page() - 1)
  }

  protected nextPage(): void {
    this.goToPage(this.page() + 1)
  }

  protected handlePageSizeChange(event: Event): void {
    const value = Number((event.target as HTMLSelectElement | null)?.value)
    if (!Number.isNaN(value) && value > 0) {
      this.pageSize.set(value)
      this.page.set(1)
    }
  }

  protected toggleClienteSelection(cliente: ClienteModel, checked: boolean): void {
    this.selectedClientes.update((current) => {
      const next = new Set(current)
      const key = this.clienteKey(cliente)
      if (checked) {
        next.add(key)
      } else {
        next.delete(key)
      }
      return next
    })
  }

  protected toggleSelectAll(checked: boolean): void {
    const visiveis = this.pagedClientes()
    this.selectedClientes.update((current) => {
      const next = new Set(current)
      for (const cliente of visiveis) {
        const key = this.clienteKey(cliente)
        if (checked) {
          next.add(key)
        } else {
          next.delete(key)
        }
      }
      return next
    })
  }

  protected isClienteSelecionado(cliente: ClienteModel): boolean {
    return this.selectedClientes().has(this.clienteKey(cliente))
  }

  protected openCreateForm(): void {
    this.viewMode.set('form')
    this.activeTab.set('dados')
    this.formFeedback.set(null)
    this.clienteForm.reset(this.defaultFormValue())
  }

  protected cancelCreateForm(): void {
    this.viewMode.set('list')
    this.formFeedback.set(null)
    this.clienteForm.reset(this.defaultFormValue())
  }

  protected selectTab(tab: ClienteTab): void {
    this.activeTab.set(tab)
  }

  protected submitClienteForm(): void {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched()
      return
    }

    const dados = this.clienteForm.getRawValue()
    console.table(dados)
    this.formFeedback.set('Formulario validado. Integre com a API para concluir o cadastro.')
  }

  protected exportarClientes(): void {
    console.info('TODO: implementar exportacao de clientes')
  }

  protected gerenciarColunas(): void {
    console.info('TODO: implementar configuracao de colunas')
  }

  protected toggleFiltros(): void {
    this.filtrosAbertos.update((aberto) => !aberto)
  }

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
    return this.firstDocumento(cliente) ?? cliente.documentoPrincipal ?? '--'
  }

  protected getTelefone(cliente: ClienteModel): string {
    if (cliente.telefone) {
      return cliente.telefone
    }

    const contato =
      cliente.contatos?.find((item) => item.principal && item.valor) ??
      (cliente.contatos?.length ? cliente.contatos[0] : null)

    return contato?.valor ?? '--'
  }

  protected getPessoaTipo(cliente: ClienteModel): CadClientePessoaTipo | undefined {
    return this.normalizePessoaTipo(cliente.pessoa_tipo ?? cliente.tipo)
  }

  protected getStatus(cliente: ClienteModel): string {
    let status = ''
    switch (Number(cliente.status)) {
      case 0:
        status = 'INATIVO'
        break
      case 1:
        status = 'ATIVO'
        break
      case 2:
        status = 'SUSPENSO'
        break
      case 3:
        status = 'BLOQUEADO'
        break
      default:
        status = typeof cliente.status === 'string' ? cliente.status : ''
    }
    return status
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
    return Boolean(cliente.vip ?? cliente.vip)
  }

  protected getEmail(cliente: ClienteModel): string {
    return cliente.email ?? 'E-mail nao informado'
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
      return status.trim().toUpperCase()
    }
    return ''
  }

  private defaultFormValue() {
    return {
      tipoPessoa: 'PF' as const,
      status: 'ATIVO',
      nome: '',
      documento: '',
      telefone: '',
      email: '',
      origem: '',
      vip: false,
      observacoes: '',
      cep: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      contatoTipo: 'Telefone',
      contatoNome: '',
      contatoTelefone: '',
      contatoEmail: '',
      documentoTipo: 'RG',
      documentoEmissor: '',
      documentoVencimento: '',
      lgpdConsentimento: false,
      lgpdCanal: '',
      lgpdData: '',
      financeiroLimite: null,
      financeiroFormaPagamento: '',
    }
  }

  private loadClientes(): void {
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

  private firstDocumento(cliente: ClienteModel): string | null {
    const documentos = cliente.documentos
    if (Array.isArray(documentos) && documentos.length) {
      const principal = documentos.find((doc) => doc.principal && doc.documento)
      return (principal ?? documentos[0]).documento ?? null
    }
    return null
  }

  private clienteKey(cliente: ClienteModel): string {
    const existente = this.clienteKeys.get(cliente)
    if (existente) {
      return existente
    }

    const fallback =
      cliente.id ??
      cliente.codigo ??
      cliente.codigo_externo ??
      cliente.codigoExterno ??
      cliente.documentoPrincipal ??
      this.firstDocumento(cliente) ??
      cliente.nome ??
      null

    const key =
      (typeof fallback === 'string' && fallback.trim()) || typeof fallback === 'number'
        ? `${fallback}`.trim()
        : `cliente-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

    this.clienteKeys.set(cliente, key)
    return key
  }
}
