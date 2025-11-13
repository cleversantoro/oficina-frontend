export type VeVeiculoCombustivel = 'GASOLINA' | 'ETANOL' | 'DIESEL' | 'FLEX' | 'ELETRICO' | 'HIBRIDO' | string

export interface VeMarca {
  id?: number
  nome?: string
  pais?: string | null
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export interface VeModelo {
  id?: number
  marcaId?: number
  marca_id?: number
  nome?: string
  anoInicio?: number | null
  ano_inicio?: number | null
  anoFim?: number | null
  ano_fim?: number | null
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
  marca?: VeMarca | null
}

export interface VeVeiculo {
  id: number
  clienteId?: number
  clienteCodigo?: string | null
  clienteNome?: string | null
  placa?: string
  marcaId?: number
  marcaNome?: string | null
  marcaPais?: string | null
  modeloId?: number | null
  modeloNome?: string | null
  ano_Fab?: number | null
  ano_Mod?: number | null
  cor?: string | null
  chassi?: string | null
  renavam?: string | null
  combustivel?: VeVeiculoCombustivel | null
  observacao?: string | null
  principal?: boolean
  ativo?: boolean
  km?: number | null
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export type SaveVeiculoPayload = Omit<VeVeiculo, 'id'> & { id?: number }
