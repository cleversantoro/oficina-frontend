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
