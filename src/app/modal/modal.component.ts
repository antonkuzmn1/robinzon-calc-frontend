import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [FormsModule],
  template: `<div [hidden]="!active()"><ng-content></ng-content></div>`,
  styleUrl: '../../assets/styles/components/modal.component.sass',
})
export class ModalComponent {

  constructor(private modalService: ModalService) { }

  active(): boolean { return this.modalService.active() }

}
