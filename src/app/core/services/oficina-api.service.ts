import { inject, Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs'
import { Cliente, Fornecedor, Mecanico, OrdemServico, Peca } from '@/app/types/oficina'

const API_BASE_URL = 'http://localhost:5134'

function ensureArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : []
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
      .pipe(map((data) => ensureArray<Peca>(data)))
  }

  getOrdensServico(): Observable<OrdemServico[]> {
    return this.http
      .get<unknown>(`${API_BASE_URL}/ordens`)
      .pipe(map((data) => ensureArray<OrdemServico>(data)))
  }
}
