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
