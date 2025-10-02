export type Cliente = {
  id?: string
  nome?: string
  documento?: string
  telefone?: string
  email?: string
  created_At?: string
}

export type Mecanico = {
  id?: string
  nome?: string
  especialidade?: string
}

export type Fornecedor = {
  id?: string
  razao_Social?: string
  cnpj?: string
  contato?: string
}

export type Peca = {
  id?: string
  codigo?: string
  descricao?: string
  preco_Unitario?: number
  quantidade?: number
  fornecedor_Id?: string
}

export type OrdemServico = {
  id?: string
  cliente_Id?: string
  mecanico_Id?: string
  descricao_Problema?: string
  status?: string
  created_At?: string
}
