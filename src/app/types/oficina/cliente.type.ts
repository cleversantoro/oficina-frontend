export type CadClienteStatus = 'ATIVO' | 'INATIVO' | 'SUSPENSO' | 'BLOQUEADO' | string

export type CadClientePessoaTipo = 'PF' | 'PJ'

export interface CadCliente {
  id: number
  codigo: number
  nome: string
  nome_exibicao: string
  documento: string
  pessoa_tipo: CadClientePessoaTipo
  status: CadClienteStatus
  cliente_vip: boolean
  observacoes: string | null
  origem_cadastro_id: number | null
  origem_id: number | null
  telefone: string | null
  email: string | null
  created_at: string
  updated_at: string | null
  deleted_at: string | null
}

export interface CadOrigem {
  id: number
  nome: string
}

export type CadPessoaPfGenero = string

export type CadPessoaPfEstadoCivil = string

export interface CadPessoaPf {
  cliente_id: number
  cpf: string
  rg: string | null
  orgao_emissor: string | null
  data_nascimento: string | null
  genero: CadPessoaPfGenero | null
  estado_civil: CadPessoaPfEstadoCivil | null
  nacionalidade: string | null
  profissao: string | null
}

export type CadPessoaPjRegimeTributario = string

export interface CadPessoaPj {
  cliente_id: number
  cnpj: string
  razao_social: string
  nome_fantasia: string | null
  ie_isento: boolean
  regime_tributario: CadPessoaPjRegimeTributario | null
  data_abertura: string | null
}

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
  complemento: string | null
}

export type CliContatoTipo = string

export interface CliContato {
  id: number
  cliente_id: number
  tipo: CliContatoTipo
  valor: string
  principal: boolean
  observacao: string | null
}

export type CliFinanceiroMeioPagamentoPreferido = string

export interface CliFinanceiro {
  cliente_id: number
  condicao_pagamento: string | null
  limite_credito: number | null
  meio_pagto_preferido: CliFinanceiroMeioPagamentoPreferido | null
  possui_bloqueio: boolean
  risco_score: number | null
  saldo_em_aberto: number | null
}

export type CliLgpdConsentimentoTipo = string

export type CliLgpdConsentimentoFonte = string

export interface CliLgpdConsentimento {
  id: number
  cliente_id: number
  tipo: CliLgpdConsentimentoTipo
  aceito: boolean
  data: Date | null
  valido_Ate: Date | null
  observacoes: string | null
  canal: string
}

export type CliAnexoTipo = string

export interface CliAnexo {
  id: number
  cliente_id: number
  nome: string
  tipo: CliAnexoTipo
  url: string
  observacao: string
}

export type CliDocumentoTipo = string

export interface CliDocumento {
  id: number
  cliente_id: number
  tipo: CliDocumentoTipo
  documento: string
  data_emissao: string | null
  data_validade: string | null
  orgao_expedidor: string | null
  principal: boolean
  created_at: string
  updated_at: string | null
}

type OptionalInfo<T> = {
  [K in keyof T]?: T[K] | null
}

export type Cliente = OptionalInfo<
  CadCliente & {
    codigo_externo?: string | null
    codigoExterno?: string | number | null
    nomeSocial?: string | null
    nome_exibicao?: string
    nomeExibicao?: string
    documentoPrincipal?: string
    tipo?: number | string
    pessoa_tipo?: CadClientePessoaTipo
    status?: CadClienteStatus | string
    cliente_vip?: boolean
    vip?: boolean
    origem?: CadOrigem | null
    origemCadastroId?: number | null
    origem_cadastro_id?: number | null
    origem_id?: number | null
    telefone?: string
    email?: string
    createdAt?: string
    created_at?: string
    created_At?: string
    updatedAt?: string | null
    updated_at?: string | null
    deleted_at?: string | null
    pessoaPf?: CadPessoaPf | null
    pessoa_pf?: CadPessoaPf | null
    pessoaPj?: CadPessoaPj | null
    pessoa_pj?: CadPessoaPj | null
    contatos?: CliContato[]
    enderecos?: CliEndereco[]
    financeiro?: CliFinanceiro | null
    consentimentos?: CliLgpdConsentimento[]
    anexos?: CliAnexo[]
    documentos?: CliDocumento[]
  }
>

export interface Paginacao<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}
