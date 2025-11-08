export type VeVeiculoCombustivel = string

export interface VeVeiculo {
  id: number
  cliente_id: number
  modelo_id: number
  placa: string
  renavam: string
  chassi: string
  ano_fab: number | null
  ano_mod: number | null
  cor: string | null
  combustivel: VeVeiculoCombustivel | null
  km_atual: number | null
  ativo: boolean
}

export type SaveVeiculoPayload = Omit<VeVeiculo, 'id'> & { id?: number }
