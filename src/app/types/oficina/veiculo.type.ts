export type VeVeiculoCombustivel = string

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
  veiculoId?: number
  veiculo_id?: number
  clienteId?: number
  cliente_id?: number
  placa?: string
  marca?: string | null
  modeloId?: number | null
  modelo_id?: number | null
  ano?: number | null
  anoFabricacao?: number | null
  ano_fabricacao?: number | null
  anoModelo?: number | null
  ano_modelo?: number | null
  ano_fab?: number | null
  ano_mod?: number | null
  cor?: string | null
  chassi?: string | null
  renavam?: string | null
  combustivel?: VeVeiculoCombustivel | null
  observacao?: string | null
  principal?: boolean
  ativo?: boolean
  kmAtual?: number | null
  km_atual?: number | null
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
  modelo?: VeModelo | null
  marcaInfo?: VeMarca | null
}

export type SaveVeiculoPayload = Omit<VeVeiculo, 'id'> & { id?: number }
