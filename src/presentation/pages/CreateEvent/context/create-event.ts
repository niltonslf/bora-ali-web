import dayjs from 'dayjs'
import { makeAutoObservable, computed, observable, action } from 'mobx'

import { EventCreationModel } from '@/domain/models'

class CreateEvent {
  activePage: number = 0
  isFirst: boolean
  isLast: boolean
  formState: EventCreationModel = {
    startDate: `${dayjs(new Date().getTime()).format('YYYY-MM-DD')}`,
    endDate: null,
    price: '',
    imagesUrl: [] as any,
  } as EventCreationModel

  isNextButtonDisabled: boolean

  constructor() {
    makeAutoObservable(this, {
      // observable
      activePage: observable,
      isFirst: observable,
      isLast: observable,
      isNextButtonDisabled: observable,
      formState: observable,

      // computed
      isEdit: computed,

      // actions
      setFormState: action,
      setActivePage: action,
      setIsFirst: action,
      setIsLast: action,
      disableNextButton: action,
    })
  }

  get isEdit() {
    return this.formState.id !== undefined
  }

  disableNextButton(value: boolean) {
    this.isNextButtonDisabled = value
  }

  setActivePage(pageNumber: number) {
    this.activePage = pageNumber
  }

  setIsFirst(value: boolean) {
    this.isFirst = value
  }

  setIsLast(value: boolean) {
    this.isLast = value
  }

  setFormState(formState: EventCreationModel) {
    this.formState = formState
  }
}

export const createEvent = new CreateEvent()
