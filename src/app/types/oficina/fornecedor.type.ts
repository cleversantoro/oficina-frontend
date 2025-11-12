export type FornecedorEndereco = {
  id?: number
  fornecedorId?: number
  fornecedor_id?: number
  tipo?: string
  cep?: string
  logradouro?: string
  numero?: string
  bairro?: string
  cidade?: string
  estado?: string
  pais?: string
  complemento?: string
  principal?: boolean
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export type FornecedorContato = {
  id?: number
  fornecedorId?: number
  fornecedor_id?: number
  tipo?: string
  valor?: string
  principal?: boolean
  observacao?: string
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export type FornecedorAnexo = {
  id?: number
  fornecedorId?: number
  fornecedor_id?: number
  nome?: string
  tipo?: string
  url?: string
  observacao?: string
  dataUpload?: string
  data_upload?: string
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export type FornecedorBanco = {
  id?: number
  fornecedorId?: number
  fornecedor_id?: number
  banco?: string
  agencia?: string
  conta?: string
  tipoConta?: string
  tipo_conta?: string
  titular?: string
  documentoTitular?: string
  documento_titular?: string
  pixChave?: string
  pix_chave?: string
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export type FornecedorHistorico = {
  id?: number
  fornecedorId?: number
  fornecedor_id?: number
  dataAlteracao?: string
  data_alteracao?: string
  usuario?: string
  campo?: string
  valorAntigo?: string
  valor_antigo?: string
  valorNovo?: string
  valor_novo?: string
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export type Fornecedor = {
  id?: number | string
  razaoSocial?: string
  razao_social?: string
  nomeFantasia?: string
  nome_fantasia?: string
  cnpj?: string
  inscricaoEstadual?: string
  inscricao_estadual?: string
  contato?: string
  email?: string
  telefone?: string
  observacoes?: string
  status?: string
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
  enderecos?: FornecedorEndereco[]
  contatos?: FornecedorContato[]
  anexos?: FornecedorAnexo[]
  bancos?: FornecedorBanco[]
  historicos?: FornecedorHistorico[]
}
