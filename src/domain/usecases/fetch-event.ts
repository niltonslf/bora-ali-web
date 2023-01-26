import { EventModel } from '../models/event-model'

export interface FetchEvent {
  fetchAll: () => Promise<EventModel[]>
  fetchByLocation: (lat: number, lng: number, radius: number) => Promise<EventModel[]>
}
