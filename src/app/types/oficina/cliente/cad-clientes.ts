export type CadClienteStatus = string

export type CadClientePessoaTipo = 'PF' | 'PJ'

export interface CadCliente {
  id: number
  status: CadClienteStatus
  pessoa_tipo: CadClientePessoaTipo
  nome_exibicao: string
  origem_cadastro_id: number | null
  cliente_vip: boolean
  created_at: string
  updated_at: string
  deleted_at: string | null
}
