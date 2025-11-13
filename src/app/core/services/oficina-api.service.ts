import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs'
import {
  Cliente,
  Fornecedor,
  Mecanico,
  OrdemServico,
  OrdemServicoAnexo,
  OrdemServicoAnexoPayload,
  OrdemServicoAvaliacao,
  OrdemServicoAvaliacaoPayload,
  OrdemServicoChecklist,
  OrdemServicoChecklistPayload,
  OrdemServicoObservacao,
  OrdemServicoObservacaoPayload,
  OrdemServicoPagamento,
  OrdemServicoPagamentoPayload,
  Peca,
  SaveOrdemServicoPayload,
} from '@/app/types/oficina'
import { SaveVeiculoPayload, VeVeiculo } from '@/app/types/oficina/veiculo.type'

const API_BASE_URL = 'http://localhost:5134'

function ensureArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : []
}

function normalizePeca(peca: Peca): Peca {
  return {
    ...peca,
    fornecedores: Array.isArray(peca.fornecedores) ? peca.fornecedores : [],
    anexos: Array.isArray(peca.anexos) ? peca.anexos : [],
    historicos: Array.isArray(peca.historicos) ? peca.historicos : [],
  }
}

@Injectable({ providedIn: 'root' })
export class OficinaApiService {
  private readonly http = inject(HttpClient)

  getClientes(): Observable<Cliente[]> {
    return this.http
      .get<unknown>(`${API_BASE_URL}/cadastro/clientes`)
      .pipe(map((data) => ensureArray<Cliente>(data)))
  }

  getMecanicos(): Observable<Mecanico[]> {
    return this.http
      .get<unknown>(`${API_BASE_URL}/cadastro/mecanicos`)
      .pipe(map((data) => ensureArray<Mecanico>(data)))
  }

  getFornecedores(): Observable<Fornecedor[]> {
    return this.http
      .get<unknown>(`${API_BASE_URL}/cadastro/fornecedores`)
      .pipe(map((data) => ensureArray<Fornecedor>(data)))
  }

  getPecas(): Observable<Peca[]> {
    return this.http
      .get<unknown>(`${API_BASE_URL}/estoque/pecas`)
      .pipe(map((data) => ensureArray<Peca>(data).map(normalizePeca)))
  }

  getOrdensServico(): Observable<OrdemServico[]> {
    return this.http
      .get<unknown>(`${API_BASE_URL}/ordens`)
      .pipe(map((data) => ensureArray<OrdemServico>(data)))
  }

  getOrdemServicoById(id: number | string): Observable<OrdemServico> {
    return this.http.get<OrdemServico>(`${API_BASE_URL}/ordens/${id}`)
  }

  createOrdemServico(payload: SaveOrdemServicoPayload): Observable<OrdemServico> {
    return this.http.post<OrdemServico>(`${API_BASE_URL}/ordens`, payload)
  }

  updateOrdemServico(id: number | string, payload: SaveOrdemServicoPayload): Observable<OrdemServico> {
    return this.http.put<OrdemServico>(`${API_BASE_URL}/ordens/${id}`, payload)
  }

  deleteOrdemServico(id: number | string): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/ordens/${id}`)
  }

  addOrdemServicoAnexo(
    ordemId: number | string,
    payload: OrdemServicoAnexoPayload
  ): Observable<OrdemServicoAnexo> {
    return this.http.post<OrdemServicoAnexo>(`${API_BASE_URL}/ordens/${ordemId}/anexos`, payload)
  }

  removeOrdemServicoAnexo(ordemId: number | string, anexoId: number | string): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/ordens/${ordemId}/anexos/${anexoId}`)
  }

  addOrdemServicoChecklist(
    ordemId: number | string,
    payload: OrdemServicoChecklistPayload
  ): Observable<OrdemServicoChecklist> {
    return this.http.post<OrdemServicoChecklist>(`${API_BASE_URL}/ordens/${ordemId}/checklists`, payload)
  }

  removeOrdemServicoChecklist(ordemId: number | string, checklistId: number | string): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/ordens/${ordemId}/checklists/${checklistId}`)
  }

  addOrdemServicoAvaliacao(
    ordemId: number | string,
    payload: OrdemServicoAvaliacaoPayload
  ): Observable<OrdemServicoAvaliacao> {
    return this.http.post<OrdemServicoAvaliacao>(`${API_BASE_URL}/ordens/${ordemId}/avaliacoes`, payload)
  }

  removeOrdemServicoAvaliacao(
    ordemId: number | string,
    avaliacaoId: number | string
  ): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/ordens/${ordemId}/avaliacoes/${avaliacaoId}`)
  }

  addOrdemServicoObservacao(
    ordemId: number | string,
    payload: OrdemServicoObservacaoPayload
  ): Observable<OrdemServicoObservacao> {
    return this.http.post<OrdemServicoObservacao>(`${API_BASE_URL}/ordens/${ordemId}/observacoes`, payload)
  }

  removeOrdemServicoObservacao(ordemId: number | string, obsId: number | string): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/ordens/${ordemId}/observacoes/${obsId}`)
  }

  addOrdemServicoPagamento(
    ordemId: number | string,
    payload: OrdemServicoPagamentoPayload
  ): Observable<OrdemServicoPagamento> {
    return this.http.post<OrdemServicoPagamento>(`${API_BASE_URL}/ordens/${ordemId}/pagamentos`, payload)
  }

  removeOrdemServicoPagamento(
    ordemId: number | string,
    pagamentoId: number | string
  ): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/ordens/${ordemId}/pagamentos/${pagamentoId}`)
  }

  getVeiculos(): Observable<VeVeiculo[]> {
    return this.http
      .get<unknown>(`${API_BASE_URL}/cadastro/veiculos`)
      .pipe(map((data) => ensureArray<VeVeiculo>(data)))
  }

  getVeiculoById(id: number): Observable<VeVeiculo> {
    return this.http.get<VeVeiculo>(`${API_BASE_URL}/cadastro/veiculos/${id}`)
  }

  createVeiculo(payload: SaveVeiculoPayload): Observable<VeVeiculo> {
    return this.http.post<VeVeiculo>(`${API_BASE_URL}/cadastro/veiculos`, payload)
  }

  updateVeiculo(id: number, payload: SaveVeiculoPayload): Observable<VeVeiculo> {
    return this.http.put<VeVeiculo>(`${API_BASE_URL}/cadastro/veiculos/${id}`, payload)
  }

  deleteVeiculo(id: number): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/cadastro/veiculos/${id}`)
  }
}
