export type CliLgpdConsentimentoTipo = string

export type CliLgpdConsentimentoFonte = string

export interface CliLgpdConsentimento {
  id: number
  cliente_id: number
  tipo: CliLgpdConsentimentoTipo
  consentido: boolean
  fonte: CliLgpdConsentimentoFonte
  ip_origem: string | null
  user_agent: string | null
  ocorrido_em: string
}
