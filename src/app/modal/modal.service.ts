import {Injectable} from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalIsOpened$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
  }

  entityName: string = ''
  entityList: { id: number | string, name: string }[] = []
  varClass: string = 'active'

  content: string = ''

  open(): void {
    this.modalIsOpened$.next(true)

    this.varClass = ''
    setTimeout((): void => {
      this.varClass = 'active'
    }, 1)
  }

  close(): void {
    this.modalIsOpened$.next(false);

    this.varClass = ''
  }

  getModalStatus() {
    return this.modalIsOpened$.asObservable();
  }

}
