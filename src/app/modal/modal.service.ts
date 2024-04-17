import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class ModalService {

  private display: boolean = false;

  open() { this.display = true }

  close() { this.display = false }

  active(): boolean { return this.display }

}