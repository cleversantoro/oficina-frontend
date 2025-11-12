export type MecanicoStatus = 'ATIVO' | 'INATIVO' | 'SUSPENSO' | 'BLOQUEADO' | string

export type MecanicoContatoTipo = string

export interface MecanicoContato {
  id?: number
  mecanicoId?: number
  mecanico_id?: number
  tipo?: MecanicoContatoTipo
  valor?: string
  principal?: boolean
  observacao?: string | null
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export interface MecanicoDisponibilidade {
  id?: number
  mecanicoId?: number
  mecanico_id?: number
  diaSemana?: number
  dia_semana?: number
  horaInicio?: string
  hora_inicio?: string
  horaFim?: string
  hora_fim?: string
  capacidadeAtendimentos?: number
  capacidade_atendimentos?: number
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export type MecanicoDocumentoTipo = string

export interface MecanicoDocumento {
  id?: number
  mecanicoId?: number
  mecanico_id?: number
  tipo?: MecanicoDocumentoTipo
  numero?: string
  dataEmissao?: string | null
  data_emissao?: string | null
  dataValidade?: string | null
  data_validade?: string | null
  orgaoExpedidor?: string | null
  orgao_expedidor?: string | null
  arquivoUrl?: string | null
  arquivo_url?: string | null
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export type MecanicoEnderecoTipo = string

export interface MecanicoEndereco {
  id?: number
  mecanicoId?: number
  mecanico_id?: number
  tipo?: MecanicoEnderecoTipo
  cep?: string
  logradouro?: string
  numero?: string
  bairro?: string
  cidade?: string
  estado?: string
  pais?: string | null
  complemento?: string | null
  principal?: boolean
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export interface MecanicoEspecialidade {
  id?: number
  codigo?: string
  nome?: string
  descricao?: string | null
  ativo?: boolean
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export interface MecanicoEspecialidadeRel {
  id?: number
  mecanicoId?: number
  mecanico_id?: number
  especialidadeId?: number
  especialidade_id?: number
  nivel?: string
  principal?: boolean
  anotacoes?: string | null
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
  especialidade?: MecanicoEspecialidade | null
}

export interface MecanicoCertificacao {
  id?: number
  mecanicoId?: number
  mecanico_id?: number
  especialidadeId?: number | null
  especialidade_id?: number | null
  titulo?: string
  instituicao?: string | null
  dataConclusao?: string | null
  data_conclusao?: string | null
  dataValidade?: string | null
  data_validade?: string | null
  codigoCertificacao?: string | null
  codigo_certificacao?: string | null
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
  especialidade?: MecanicoEspecialidade | null
}

export interface MecanicoExperiencia {
  id?: number
  mecanicoId?: number
  mecanico_id?: number
  empresa?: string
  cargo?: string
  dataInicio?: string | null
  data_inicio?: string | null
  dataFim?: string | null
  data_fim?: string | null
  resumoAtividades?: string | null
  resumo_atividades?: string | null
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export interface Mecanico {
  id?: number | null
  codigo?: string
  documentoPrincipal?: string
  documento_principal?: string
  nomeCompleto?: string
  nome_completo?: string
  apelido?: string | null
  nivel?: string
  status?: MecanicoStatus
  valorHora?: number | null
  valor_hora?: number | null
  ValorHora?: number | null
  especialidadePrincipalId?: number | null
  especialidade_principal_id?: number | null
  especialidadePrincipal?: MecanicoEspecialidade | string | null
  observacoes?: string | null
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
  certificacoes?: MecanicoCertificacao[]
  contatos?: MecanicoContato[]
  disponibilidades?: MecanicoDisponibilidade[]
  documentos?: MecanicoDocumento[]
  enderecos?: MecanicoEndereco[]
  especialidades?: MecanicoEspecialidadeRel[]
  experiencias?: MecanicoExperiencia[]
}
