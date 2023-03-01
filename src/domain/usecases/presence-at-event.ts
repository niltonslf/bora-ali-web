export interface PresenceAtEvent {
  confirm: (eventId: string, userId: string) => Promise<any>
  cancel: (eventId: string, userId: string) => Promise<any>
}
