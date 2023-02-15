import { EventModel } from '../models/event-model'

export type FiltersProps = {
  category: string
  placeType: string
  musicStyle: string
}

export interface FetchEvent {
  fetchAll: () => Promise<EventModel[]>
  fetchByLocation: (
    lat: number,
    lng: number,
    radius: number,
    filters?: FiltersProps
  ) => Promise<EventModel[]>
  fetchById: (eventId: string) => Promise<EventModel>
  fetchByUserId: (userId: string) => Promise<EventModel[]>
  deleteById: (eventId: string) => Promise<any>
}
