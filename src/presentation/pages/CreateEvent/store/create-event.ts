import dayjs from 'dayjs'
import { makeAutoObservable, computed, observable, action } from 'mobx'

import { EventCreationModel } from '@/domain/models'

class CreateEvent {
  initialData = {
    startDate: `${dayjs(new Date().getTime()).format('YYYY-MM-DD')}`,
    endDate: null,
    price: '',
    imagesUrl: [] as any,
    isPrivate: false,
  } as EventCreationModel

  formState: EventCreationModel = this.initialData

  constructor() {
    makeAutoObservable(this, {
      // observable
      formState: observable,

      // computed
      isEdit: computed,

      // actions
      setFormState: action,
      resetFormData: action,
    })
  }

  get isEdit() {
    return this.formState.id !== undefined
  }

  setFormState(formState: EventCreationModel) {
    this.formState = formState
  }

  resetFormData() {
    this.formState = this.initialData
  }
}

export const createEvent = new CreateEvent()
