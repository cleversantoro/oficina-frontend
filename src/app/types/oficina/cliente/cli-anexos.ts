export type CliAnexoTipo = string

export interface CliAnexo {
  id: number
  cliente_id: number
  tipo: CliAnexoTipo
  nome_arquivo: string
  caminho: string
  hash_sha256: string
  tamanho_bytes: number
  content_type: string
}
