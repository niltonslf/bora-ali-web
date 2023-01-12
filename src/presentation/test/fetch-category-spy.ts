import { CategoryModel } from '@/domain/models'
import { mockCategoryListModel } from '@/domain/test/mock-fetch-category'
import { FetchCategory } from '@/domain/usecases'

export class RemoteFetchCategorySpy implements FetchCategory {
  callsCount = 0
  response = mockCategoryListModel()

  async fetchAll(): Promise<CategoryModel[]> {
    this.callsCount++
    return this.response
  }
}
