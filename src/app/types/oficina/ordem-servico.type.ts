export type OrdemServicoStatus = 'ABERTA' | 'EM_ANDAMENTO' | 'CONCLUIDA' | 'CANCELADA' | string

export interface OrdemServicoItem {
  id?: number
  ordemServicoId?: number
  ordem_servico_id?: number
  pecaId?: number | null
  peca_id?: number | null
  descricao?: string
  quantidade?: number
  valorUnitario?: number
  valor_unitario?: number
  total?: number
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
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
  id: number
  ordemServicoId?: number
  ordem_servico_id?: number
  clienteId?: number
  cliente_id?: number
  mecanicoId?: number
  mecanico_id?: number
  descricaoProblema?: string
  descricao_problema?: string
  status?: OrdemServicoStatus
  dataAbertura?: string
  data_abertura?: string
  dataConclusao?: string | null
  data_conclusao?: string | null
  createdAt?: string
  created_at?: string
  updatedAt?: string | null
  updated_at?: string | null
  itens?: OrdemServicoItem[]
  anexos?: OrdemServicoAnexo[]
  historicos?: OrdemServicoHistorico[]
  checklists?: OrdemServicoChecklist[]
  avaliacoes?: OrdemServicoAvaliacao[]
  pagamentos?: OrdemServicoPagamento[]
  observacoes?: OrdemServicoObservacao[]
}
