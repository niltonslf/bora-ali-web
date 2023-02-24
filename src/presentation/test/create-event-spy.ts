import { EventModel } from '@/domain/models'
import { mockEventModel } from '@/domain/test'
import { PersistEvent } from '@/domain/usecases/persist-event'

export class RemoteCreateEventSpy implements PersistEvent {
  callsCount = 0
  event: FormData
  response = mockEventModel()

  async create(event: FormData): Promise<EventModel | null> {
    this.event = event
    this.callsCount++

    return this.response
  }

  async update(event: FormData, eventId: string): Promise<EventModel | null> {
    this.event = event
    this.callsCount++

    return this.response
  }
}
