export type PecaFornecedor = {
  fornecedorId: number
  peca_Id: number
  preco?: number
  prazoEntrega?: number
  observacao?: string
}

export type PecaAnexo = {
  peca_Id: number
  nome: string
  tipo: string
  url: string
  observacao?: string
}

export type PecaHistorico = {
  peca_Id: number
  dataAlteracao: string
  usuario: string
  campo: string
  valorAntigo?: string
  valorNovo?: string
}

export type Peca = {
  id?: string | number
  peca_Id?: number
  codigo?: string
  descricao?: string
  precoUnitario?: number
  quantidade?: number
  estoqueMinimo?: number
  estoqueMaximo?: number
  unidade?: string
  status?: string
  observacoes?: string
  fabricanteId?: number
  categoriaId?: number
  localizacaoId?: number
  fornecedores?: PecaFornecedor[]
  anexos?: PecaAnexo[]
  historicos?: PecaHistorico[]
}
