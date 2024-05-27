import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ModalService} from "./modal.service";
import {CdkDrag} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgForOf,
    CdkDrag,
    NgIf
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {

  constructor(private modalService: ModalService) {
  }

  classButtonId: string = ""
  selectButtonText: string = "Select"

  ngOnInit(): void {
  }

  stopPropagation(event: MouseEvent): void {
    event.stopPropagation();
  }

  close(): void {
    this.modalService.close()
  }

  class(): string {
    return this.modalService.varClass
  }

  content(): string {
    return this.modalService.content
  }

  dropdownIsHidden: boolean = true

  toggleDropdown(): void {
    this.dropdownIsHidden = !this.dropdownIsHidden
  }

  closeDropdown(): void {
    this.dropdownIsHidden = true
  }

  entityName(): string {
    return this.modalService.entityName
  }

  entityList(): { id: number | string, name: string }[] {
    return this.modalService.entityList
  }


}
