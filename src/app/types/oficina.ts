export type Cliente = {
  id?: string
  nome?: string
  documento?: string
  telefone?: string
  email?: string
  createdAt?: string
}

export type Mecanico = {
  id?: string
  nome?: string
  especialidade?: string
}

export type Fornecedor = {
  id?: string
  razaoSocial?: string
  cnpj?: string
  contato?: string
}

export type Peca = {
  id?: string
  codigo?: string
  descricao?: string
  precoUnitario?: number
  quantidade?: number
  fornecedorId?: string
}

export type OrdemServico = {
  id?: string
  clienteId?: string
  mecanicoId?: string
  descricaoProblema?: string
  status?: string
  criadaEm?: string
  createdAt?: string
}
