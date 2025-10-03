export type CliEnderecoTipo = string

export interface CliEndereco {
  id: number
  cliente_id: number
  tipo: CliEnderecoTipo
  logradouro: string
  numero: string
  bairro: string
  cidade: string
  uf: string
  cep: string
  pais: string
  principal: boolean
}
