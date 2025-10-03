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
