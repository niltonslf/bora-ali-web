import { PresenceAtEvent } from '@/domain/usecases'

export class RemotePresenceAtEventSpy implements PresenceAtEvent {
  callsCount = 0
  response = null

  async confirm(eventId: string, userId: string): Promise<any> {
    this.callsCount++
    return this.response
  }

  async cancel(eventId: string, userId: string): Promise<any> {
    this.callsCount++
    return this.response
  }
}
