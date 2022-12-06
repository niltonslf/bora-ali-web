import { EventModel } from '../models/event-model'

export interface FetchEvent {
  fetchAll: () => Promise<EventModel[]>
}
