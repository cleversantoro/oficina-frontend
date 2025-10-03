export type CliContatoTipo = string

export interface CliContato {
  id: number
  cliente_id: number
  tipo: CliContatoTipo
  valor: string
  email_lower: string | null
  preferido: boolean
}
