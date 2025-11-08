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
