import dayjs from 'dayjs'
import { makeAutoObservable, computed, observable, action } from 'mobx'

import { EventCreationModel } from '@/domain/models'

class CreateEvent {
  formState: EventCreationModel = {
    startDate: `${dayjs(new Date().getTime()).format('YYYY-MM-DD')}`,
    endDate: null,
    price: '',
    imagesUrl: [] as any,
  } as EventCreationModel

  constructor() {
    makeAutoObservable(this, {
      // observable
      formState: observable,

      // computed
      isEdit: computed,

      // actions
      setFormState: action,
    })
  }

  get isEdit() {
    return this.formState.id !== undefined
  }

  setFormState(formState: EventCreationModel) {
    this.formState = formState
  }
}

export const createEvent = new CreateEvent()
