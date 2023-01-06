import { CategoryModel } from '@/domain/models'

export interface FetchCategory {
  fetchAll: () => Promise<CategoryModel[]>
}
