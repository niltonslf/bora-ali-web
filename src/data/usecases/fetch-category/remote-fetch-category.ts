import { InvalidCredentialsError, UnexpectedError } from '@/data/errors'
import { HttpStatusCode, HttpClient } from '@/data/protocols/http'
import { CategoryModel } from '@/domain/models'
import { FetchCategory } from '@/domain/usecases'

export class RemoteFetchCategory implements FetchCategory {
  constructor(private readonly httpClient: HttpClient) {}

  async fetchAll(): Promise<CategoryModel[]> {
    const response = await this.httpClient.request({ url: '/category', method: 'get' })

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      case HttpStatusCode.noContent:
        return []
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
