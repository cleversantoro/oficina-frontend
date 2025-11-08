import {
  CadCliente,
  CadClientePessoaTipo,
  CadClienteStatus,
  CadOrigem,
  CadPessoaPf,
  CadPessoaPj,
  CliAnexo,
  CliContato,
  CliEndereco,
  CliFinanceiro,
  CliLgpdConsentimento,
} from '../oficina/cliente/'

export interface ClienteDocumento {
  tipo: string
  numero: string
  data_emissao?: string | null
  data_validade?: string | null
  orgao_expedidor?: string | null
  arquivo_url?: string | null
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
    lgpdConsentimentos?: CliLgpdConsentimento[]
    lgpd_consentimentos?: CliLgpdConsentimento[]
    anexos?: CliAnexo[]
    documentos?: ClienteDocumento[]
  }
>

export interface Paginacao<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}
