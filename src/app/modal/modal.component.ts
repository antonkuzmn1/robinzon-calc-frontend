/*

Copyright 2024 Anton Kuzmin (http://github.com/antonkuzmn1)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ModalService} from './modal.service';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgFor} from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgFor
  ],
  template: `
    <section [class]="class()" (click)="close()">
      <div class="background">
        <div class="content" [class]="class()" (click)="stopPropagation($event)">
          <div class="header">
            <button routerLinkActive="active" [routerLink]="routerLink + 'filter'" class="tab">Filter</button>
            <button routerLinkActive="active" [routerLink]="routerLink + 'new'" class="tab">New</button>
            <div class="tab">
              <button (click)="toggleDropdown()">{{ entityName() === '' ? 'Select' : entityName() }}
              </button>
              <div [hidden]="dropdownIsHidden" class="tab-content">
                <button *ngFor="let entity of entityList()" routerLinkActive="active"
                        [routerLink]="routerLink + entity.id">{{ entity.name }}
                </button>
              </div>
            </div>
            <button class="close" (click)="close()">×</button>
          </div>
          <router-outlet></router-outlet>
          <!--<div class="body" [innerHTML]="content()"></div>-->
        </div>
      </div>
    </section>
  `,
  styleUrl: '../../assets/styles/components/modal.component.sass',
})
export class ModalComponent implements OnInit {

  constructor(private modalService: ModalService,
              private router: Router) {
  }

  routerLink: string = ""

  // noinspection JSUnusedGlobalSymbols
  ngOnInit(): void {
    this.routerLink = this.router.url.replace(/\/modal\/[^/]*/, '') + '/modal/'
    console.log(this.router.url.split('/')[3])
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

  entityName(): string {
    return this.modalService.entityName
  }

  entityList(): { id: number | string, name: string }[] {
    return this.modalService.entityList
  }

}
