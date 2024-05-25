import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {NgForOf} from "@angular/common";
import {ModalService} from "./modal.service";

/**
 * Based frame for all modal(pop-up) dialog windows
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
    NgForOf
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {

  constructor(private modalService: ModalService,
              private router: Router) {
  }

  routerLink: string = ""
  classButtonId: string = ""
  selectButtonText: string = "Select"

  // noinspection JSUnusedGlobalSymbols
  ngOnInit(): void {
    this.routerLink = this.router.url.replace(/\/modal\/[^/]*/, '') + '/modal/'

    this.selectButtonClassController()

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.selectButtonClassController()
      }
    });
  }

  selectButtonClassController(): void {
    const routeInModal: string = this.router.url.split('/')[3]
    switch (routeInModal) {
      case 'filter':
        this.classButtonId = ''
        this.selectButtonText = 'Select'
        break;
      case 'new':
        this.classButtonId = ''
        this.selectButtonText = 'Select'
        break;
      default:
        this.classButtonId = 'active'
        const timeOut: number = this.modalService.entityList.length === 0 ? 3000 : 0;
        setTimeout(() => {
          const vmName: string | undefined = this.modalService.entityList.find(entity => entity.id === routeInModal)?.name
          if (vmName === undefined || vmName === '') return
          this.selectButtonText = vmName
        }, timeOut)
    }
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
