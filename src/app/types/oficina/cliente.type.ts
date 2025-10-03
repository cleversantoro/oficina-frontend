export type Cliente = {
  id?: string
  nome?: string
  documento?: string
  telefone?: string
  email?: string
  created_At?: string
}

export interface Paginacao<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}
