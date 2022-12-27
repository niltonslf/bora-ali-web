import { EventCreationModel, EventModel } from '../models/event-model'

export interface CreateEvent {
  create: (event: EventCreationModel) => Promise<EventModel>
}
