import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private router: Router) {
  }

  entityName: string = ''
  entityList: { id: number | string, name: string }[] = []
  varClass: string = 'active'

  content: string = ''

  open(): void {
    this.varClass = ''
    setTimeout((): void => {
      this.varClass = 'active'
    }, 1)
  }

  close(): void {
    this.varClass = ''
    setTimeout((): void => {
      this.router.navigateByUrl(this.router.url.replace(/\/modal\/[^/]*/, ''))
      this.content = ''
      this.entityName = ''
    }, 101)
  }

}
