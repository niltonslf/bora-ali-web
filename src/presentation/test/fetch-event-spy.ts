import { EventModel } from '@/domain/models'
import { mockEventListModel } from '@/domain/test/mock-fetch-event'
import { FetchEvent } from '@/domain/usecases'

export class FetchEventSpy implements FetchEvent {
  callsCount: number = 0

  async fetchAll(): Promise<EventModel[]> {
    this.callsCount++
    return mockEventListModel()
  }

  async fetchByLocation(lat: number, lng: number, radius: number): Promise<EventModel[]> {
    this.callsCount++
    return mockEventListModel()
  }
}
