import { EventModel } from '../models/event-model'

export interface CreateEvent {
  create: (event: FormData) => Promise<EventModel | null>
  update: (event: FormData, eventId: string) => Promise<EventModel | null>
}
