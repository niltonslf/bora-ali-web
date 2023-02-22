import { makeAutoObservable, observable, action } from 'mobx'

class StepPage {
  activePage: number = 0
  isFirst: boolean
  isLast: boolean

  isNextButtonDisabled: boolean

  constructor() {
    makeAutoObservable(this, {
      // observable
      activePage: observable,
      isFirst: observable,
      isLast: observable,
      isNextButtonDisabled: observable,

      // actions
      setActivePage: action,
      setIsFirst: action,
      setIsLast: action,
      disableNextButton: action,
    })
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
}

export const stepPage = new StepPage()
