import { EventModel } from '../models/event-model'

export interface PersistEvent {
  create: (event: FormData) => Promise<EventModel | null>
  update: (event: FormData, eventId: string) => Promise<EventModel | null>
  deleteById: (eventId: string) => Promise<any>
}
