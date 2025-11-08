import { DecimalPipe, NgClass } from '@angular/common'
import { Component, computed, inject, signal } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms'
import { PageTitle } from '@app/components/page-title'
import { OficinaApiService } from '@core/services/oficina-api.service'
import { SaveVeiculoPayload, VeVeiculo } from '@/app/types/oficina/ve-veiculos'

type SubmitMode = 'create' | 'update'

@Component({
  selector: 'app-veiculo',
  imports: [PageTitle, ReactiveFormsModule, DecimalPipe],
  templateUrl: './veiculo.html',
  styleUrl: './veiculo.scss',
})
export class Veiculo {
  private readonly api = inject(OficinaApiService)
  private readonly fb = inject(FormBuilder)
  private readonly currentYear = new Date().getFullYear()

  protected readonly veiculos = signal<VeVeiculo[]>([])
  protected readonly loading = signal(true)
  protected readonly saving = signal(false)
  protected readonly deletingId = signal<number | null>(null)
  protected readonly selected = signal<VeVeiculo | null>(null)
  protected readonly modalOpen = signal(false)
  protected readonly error = signal<string | null>(null)
  protected readonly successMessage = signal<string | null>(null)

  protected readonly combustivelOptions = ['GASOLINA', 'ETANOL', 'DIESEL', 'FLEX', 'ELETRICO', 'HIBRIDO']

  protected readonly form = this.fb.group({
    cliente_id: this.fb.control<number | null>(null, { validators: [Validators.required] }),
    modelo_id: this.fb.control<number | null>(null, { validators: [Validators.required] }),
    placa: this.fb.control('', { validators: [Validators.required, Validators.maxLength(8)] }),
    renavam: this.fb.control('', { validators: [Validators.required, Validators.maxLength(20)] }),
    chassi: this.fb.control('', { validators: [Validators.required, Validators.maxLength(20)] }),
    ano_fab: this.fb.control<number | null>(null, {
      validators: [Validators.min(1900), Validators.max(this.currentYear + 1)],
    }),
    ano_mod: this.fb.control<number | null>(null, {
      validators: [Validators.min(1900), Validators.max(this.currentYear + 2)],
    }),
    cor: this.fb.control(''),
    combustivel: this.fb.control(''),
    km_atual: this.fb.control<number | null>(null, { validators: [Validators.min(0)] }),
    ativo: this.fb.control(true, { nonNullable: true }),
  })

  protected readonly controls = this.form.controls
  protected readonly isEditing = computed(() => Boolean(this.selected()))
  protected readonly modalTitle = computed(() => (this.isEditing() ? 'Editar veiculo' : 'Cadastrar veiculo'))

  protected readonly resumo = computed(() => {
    const lista = this.veiculos()
    const total = lista.length
    const ativos = lista.filter((item) => item.ativo).length
    const inativos = total - ativos
    const somaKm = lista.reduce((acc, item) => acc + (typeof item.km_atual === 'number' ? item.km_atual : 0), 0)
    const mediaKm = total > 0 ? Math.round(somaKm / total) : 0

    return [
      { label: 'Total', value: total },
      { label: 'Ativos', value: ativos },
      { label: 'Inativos', value: inativos },
      { label: 'Media KM', value: mediaKm },
    ]
  })

  protected readonly trackResumo = (_: number, card: { label: string }): string => card.label

  constructor() {
    this.loadVeiculos()
  }

  protected trackByVeiculo = (_: number, veiculo: VeVeiculo): string => `${veiculo.id ?? veiculo.placa ?? _}`

  protected submit(): void {
    if (this.form.invalid || this.saving()) {
      this.form.markAllAsTouched()
      return
    }

    let payload: SaveVeiculoPayload
    try {
      payload = this.buildPayload()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Falha ao preparar os dados do veiculo.'
      this.error.set(message)
      return
    }

    const selected = this.selected()
    const mode: SubmitMode = selected ? 'update' : 'create'

    this.saving.set(true)
    const request$ = selected ? this.api.updateVeiculo(selected.id, payload) : this.api.createVeiculo(payload)

    request$.pipe(takeUntilDestroyed()).subscribe({
      next: (veiculo) => {
        this.successMessage.set(
          mode === 'create' ? 'Veiculo cadastrado com sucesso.' : 'Veiculo atualizado com sucesso.'
        )
        this.error.set(null)
        this.replaceOrAppend(veiculo)
        this.resetForm()
        this.modalOpen.set(false)
        this.saving.set(false)
      },
      error: (err) => {
        console.error('Falha ao salvar veiculo', err)
        this.error.set('Nao foi possivel salvar o veiculo. Verifique os dados e tente novamente.')
        this.saving.set(false)
      },
    })
  }

  protected openCreateModal(): void {
    this.selected.set(null)
    this.successMessage.set(null)
    this.error.set(null)
    this.form.reset(this.defaultFormValue())
    this.form.markAsPristine()
    this.form.markAsUntouched()
    this.modalOpen.set(true)
  }

  protected editVeiculo(veiculo: VeVeiculo): void {
    this.selected.set(veiculo)
    this.successMessage.set(null)
    this.error.set(null)
    this.form.patchValue({
      cliente_id: veiculo.cliente_id,
      modelo_id: veiculo.modelo_id,
      placa: veiculo.placa,
      renavam: veiculo.renavam,
      chassi: veiculo.chassi,
      ano_fab: veiculo.ano_fab,
      ano_mod: veiculo.ano_mod,
      cor: veiculo.cor ?? '',
      combustivel: veiculo.combustivel ?? '',
      km_atual: veiculo.km_atual,
      ativo: veiculo.ativo,
    })
    this.modalOpen.set(true)
  }

  protected cancelEdicao(): void {
    this.resetForm()
    this.modalOpen.set(false)
  }

  protected deleteVeiculo(veiculo: VeVeiculo): void {
    if (this.deletingId()) {
      return
    }

    const confirmed = window.confirm(`Deseja remover o veiculo ${veiculo.placa}?`)
    if (!confirmed) {
      return
    }

    this.deletingId.set(veiculo.id)
    this.api
      .deleteVeiculo(veiculo.id)
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: () => {
          this.veiculos.update((lista) => lista.filter((item) => item.id !== veiculo.id))
          if (this.selected()?.id === veiculo.id) {
            this.resetForm()
            this.modalOpen.set(false)
          }
          this.successMessage.set('Veiculo removido com sucesso.')
          this.error.set(null)
          this.deletingId.set(null)
        },
        error: (err) => {
          console.error('Falha ao remover veiculo', err)
          this.error.set('Nao foi possivel excluir o veiculo agora.')
          this.deletingId.set(null)
        },
      })
  }

  protected getStatusBadge(veiculo: VeVeiculo): string {
    return veiculo.ativo ? 'badge text-bg-success-subtle' : 'badge text-bg-secondary-subtle'
  }

  protected clearMessage(): void {
    this.successMessage.set(null)
  }

  private loadVeiculos(): void {
    this.loading.set(true)
    this.api
      .getVeiculos()
      .pipe(takeUntilDestroyed())
      .subscribe({
        next: (veiculos) => {
          this.veiculos.set(this.sortVeiculos(veiculos))
          this.error.set(null)
          this.loading.set(false)
        },
        error: (err) => {
          console.error('Falha ao carregar veiculos', err)
          this.veiculos.set([])
          this.error.set('Nao foi possivel carregar os veiculos cadastrados.')
          this.loading.set(false)
        },
      })
  }

  private resetForm(): void {
    this.selected.set(null)
    this.form.reset(this.defaultFormValue())
    this.form.markAsPristine()
    this.form.markAsUntouched()
  }

  private defaultFormValue() {
    return {
      cliente_id: null,
      modelo_id: null,
      placa: '',
      renavam: '',
      chassi: '',
      ano_fab: null,
      ano_mod: null,
      cor: '',
      combustivel: '',
      km_atual: null,
      ativo: true,
    }
  }

  private replaceOrAppend(veiculo: VeVeiculo): void {
    this.veiculos.update((lista) => {
      const index = lista.findIndex((item) => item.id === veiculo.id)
      if (index === -1) {
        return this.sortVeiculos([...lista, veiculo])
      }

      const copia = [...lista]
      copia.splice(index, 1, veiculo)
      return this.sortVeiculos(copia)
    })
  }

  private sortVeiculos(veiculos: VeVeiculo[]): VeVeiculo[] {
    return [...veiculos].sort((a, b) => {
      const placaA = (a.placa ?? '').toUpperCase()
      const placaB = (b.placa ?? '').toUpperCase()
      return placaA.localeCompare(placaB)
    })
  }

  private buildPayload(): SaveVeiculoPayload {
    const raw = this.form.value
    return {
      cliente_id: this.ensureNumber(raw.cliente_id, 'cliente'),
      modelo_id: this.ensureNumber(raw.modelo_id, 'modelo'),
      placa: this.requireText(raw.placa).toUpperCase(),
      renavam: this.requireText(raw.renavam),
      chassi: this.requireText(raw.chassi).toUpperCase(),
      ano_fab: this.optionalNumber(raw.ano_fab),
      ano_mod: this.optionalNumber(raw.ano_mod),
      cor: this.optionalText(raw.cor),
      combustivel: this.optionalText(raw.combustivel),
      km_atual: this.optionalNumber(raw.km_atual),
      ativo: Boolean(raw.ativo),
    }
  }

  private ensureNumber(value: unknown, field: string): number {
    const parsed = this.optionalNumber(value)
    if (typeof parsed === 'number') {
      return parsed
    }

    throw new Error(`Campo ${field} e obrigatorio.`)
  }

  private optionalNumber(value: unknown): number | null {
    if (value === null || value === undefined || value === '') {
      return null
    }

    const parsed = typeof value === 'number' ? value : Number(value)
    return Number.isNaN(parsed) ? null : parsed
  }

  private requireText(value: unknown): string {
    const normalized = this.optionalText(value)
    if (normalized) {
      return normalized
    }
    throw new Error('Campo texto obrigatorio nao informado.')
  }

  private optionalText(value: unknown): string | null {
    if (typeof value === 'string') {
      const trimmed = value.trim()
      return trimmed ? trimmed : null
    }

    return null
  }
}
