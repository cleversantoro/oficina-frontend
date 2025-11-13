export type OrdemServicoStatus = 'ABERTA' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA' | string

export interface OrdemServicoItem {
  id: number
  ordem_Servico_Id?: number
  peca_Id?: number | null
  descricao?: string
  quantidade?: number
  valor_Unitario?: number
  total?: number
  created_At?: string
  updated_At?: string | null
}

export interface OrdemServicoAnexo {
  id?: number
  ordemServicoId?: number
  ordem_servico_id?: number
  nome?: string
  tipo?: string
  url?: string
  observacao?: string | null
  dataUpload?: string
  data_upload?: string
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export interface OrdemServicoHistorico {
  id?: number
  ordemServicoId?: number
  ordem_servico_id?: number
  dataAlteracao?: string
  data_alteracao?: string
  usuario?: string
  campo?: string
  valorAntigo?: string | null
  valor_antigo?: string | null
  valorNovo?: string | null
  valor_novo?: string | null
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export interface OrdemServicoChecklist {
  id?: number
  ordemServicoId?: number
  ordem_servico_id?: number
  item?: string
  realizado?: boolean
  observacao?: string | null
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export interface OrdemServicoAvaliacao {
  id?: number
  ordemServicoId?: number
  ordem_servico_id?: number
  nota?: number
  comentario?: string | null
  usuario?: string | null
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export interface OrdemServicoPagamento {
  id?: number
  ordemServicoId?: number
  ordem_servico_id?: number
  valor?: number
  status?: string
  dataPagamento?: string | null
  data_pagamento?: string | null
  metodo?: string | null
  observacao?: string | null
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export interface OrdemServicoObservacao {
  id?: number
  ordemServicoId?: number
  ordem_servico_id?: number
  usuario?: string | null
  texto?: string
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
}

export interface OrdemServico {
  id?: number | string
  ordemServicoId?: number
  ordem_servico_id?: number
  cliente_Id?: number
  mecanico_Id?: number
  descricao_Problema?: string
  status?: OrdemServicoStatus
  data_Abertura?: string
  data_Conclusao?: string | null
  created_At?: string
  updated_At?: string | null
  itens?: OrdemServicoItem[]
  anexos?: OrdemServicoAnexo[]
  historicos?: OrdemServicoHistorico[]
  checklists?: OrdemServicoChecklist[]
  avaliacoes?: OrdemServicoAvaliacao[]
  pagamentos?: OrdemServicoPagamento[]
  observacoes?: OrdemServicoObservacao[]
}

export type SaveOrdemServicoPayload = {
  cliente_id: number
  mecanico_id: number
  descricao_problema: string
  status?: OrdemServicoStatus
  data_abertura?: string
  data_conclusao?: string | null
}

export type OrdemServicoAnexoPayload = {
  nome: string
  tipo?: string
  url?: string
  observacao?: string | null
}

export type OrdemServicoChecklistPayload = {
  item: string
  realizado?: boolean
  observacao?: string | null
}

export type OrdemServicoAvaliacaoPayload = {
  nota: number
  comentario?: string | null
  usuario?: string | null
}

export type OrdemServicoPagamentoPayload = {
  valor: number
  status: string
  data_pagamento?: string | null
  metodo?: string | null
  observacao?: string | null
}

export type OrdemServicoObservacaoPayload = {
  usuario?: string | null
  texto: string
}
