import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs'
import { Cliente, Fornecedor, Mecanico, OrdemServico, Peca } from '@/app/types/oficina'
import { SaveVeiculoPayload, VeVeiculo } from '@/app/types/oficina/ve-veiculos'

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
