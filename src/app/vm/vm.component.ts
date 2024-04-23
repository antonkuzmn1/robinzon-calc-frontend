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
import {VmService} from "./vm.service";
import {VmEntity} from "./forms/vm-entity";
import {VmRaw} from "./forms/vm-raw";
import {NgFor} from "@angular/common";
import {ModalService} from "../modal/modal.service";
import {RouterOutlet, ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AppData} from "../app-data";
import {AppComponent} from "../app.component";
import {ModalComponent} from "../modal/modal.component";

/**
 * VM table app container
 */
@Component({
  imports: [
    NgFor,
    ModalComponent,
    RouterOutlet,
    RouterLink
  ],
  selector: 'app-vm',
  standalone: true,
  styleUrl: '../../assets/styles/components/vm.component.sass',
  template: `
    <section>
      <router-outlet></router-outlet>
      <div>
        <table class='header'>
          <tr>
            <th class='button'>
              <button (click)="filter()">Action</button>
            </th>
            <th class='large'>
              <div>
                <button (click)="sortTable('name', true)">▲</button>
                <button (click)="sortTable('name', false)">▼</button>
                <div>Name</div>
              </div>
            </th>
            <th class='small'>
              <div>
                <button (click)="sortTable('fmName', true)">▲</button>
                <button (click)="sortTable('fmName', false)">▼</button>
                <div>Host</div>
              </div>
            </th>
            <th class='small'>
              <div>
                <button (click)="sortTable('cpu', true)">▲</button>
                <button (click)="sortTable('cpu', false)">▼</button>
                <div>CPU</div>
              </div>
            </th>
            <th class='small'>
              <div>
                <button (click)="sortTable('ram', true)">▲</button>
                <button (click)="sortTable('ram', false)">▼</button>
                <div>RAM</div>
              </div>
            </th>
            <th class='small'>
              <div>
                <button (click)="sortTable('ssd', true)">▲</button>
                <button (click)="sortTable('ssd', false)">▼</button>
                <div>SSD</div>
              </div>
            </th>
            <th class='small'>
              <div>
                <button (click)="sortTable('hdd', true)">▲</button>
                <button (click)="sortTable('hdd', false)">▼</button>
                <div>HDD</div>
              </div>
            </th>
            <th class='small'>
              <div>
                <button (click)="sortTable('state', true)">▲</button>
                <button (click)="sortTable('state', false)">▼</button>
                <div>State</div>
              </div>
            </th>
          </tr>
        </table>
        <table class='content'>
          <tr *ngFor="let vm of vmList">
            <td class='button'>
              <button (click)="edit(vm)">Edit</button>
            </td>
            <td class='large'>{{ vm.name }}</td>
            <td class='small'>{{ vm.fmName }}</td>
            <td class='small'>{{ vm.cpu }}</td>
            <td class='small'>{{ vm.ram }}</td>
            <td class='small'>{{ vm.ssd }}</td>
            <td class='small'>{{ vm.hdd }}</td>
            <td class='small'>{{ vm.state ? 'Running' : 'Off' }}</td>
          </tr>
        </table>
      </div>
    </section>
  `,
})
export class VmComponent implements OnInit {
  constructor(
    private vmService: VmService,
    private modalService: ModalService,
    private app: AppComponent,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  /**
   * Table data
   */
  vmList: VmEntity[] = [new VmEntity()]

  // noinspection JSUnusedGlobalSymbols
  ngOnInit(): void {
    this.fragmentManager()
  }

  fragmentManager(data: AppData | null = null): void {
    if (data === null) {
      /*
      START
       */
      this.route.fragment.subscribe((data: string | null): void => {
        if (data === null) this.getTable()
        else {
          try {
            const dataJson: string = decodeURIComponent(data)
            const vmData: AppData = JSON.parse(dataJson)
            this.getTable(vmData)
            /*
            then:
              1. set new vmData from backend
              2. put this encoded vmData into url
             */

          } catch (e) {
            this.getTable()
          }
        }
      })
      /*
      STOP
       */
    } else {
      console.log(data)

    }
  }

  /**
   * subscribe for table data
   */
  private getTable = (data: AppData = this.app.vmData): void => {
    console.log(data)
    this.vmService.getVmTable().subscribe({
      next: (data: VmRaw[]) => {
        this.vmList = data.map(row => {
          return {
            id: row.id,
            clientName: "",
            name: row.name,
            fmName: row.fmEntity.name,
            cpu: row.cpu,
            ram: row.ram,
            ssd: row.ssd,
            hdd: row.hdd,
            state: row.running
          };
        });
        this.modalService.entityList = this.vmList.map((vm: VmEntity): {
          id: string | number,
          name: string
        } => ({
          id: vm.id,
          name: vm.name
        }))
        /*
         then:
          1. set new vmData from backend
          2. put this encoded vmData into url
         */
        // const vmData: AppData = this.app.vmData
        // const vmDataJson: string = JSON.stringify(vmData)
        // const vmDataEncoded: string = encodeURIComponent(vmDataJson)
        // this.router.navigate([], {fragment: vmDataEncoded})
      }
    });
  };

  /**
   * Sort table
   * @param column - name of the column
   * @param asc - mark as true if ascending. mark as false if descending
   */
  sortTable(column: string, asc: boolean): void {
    if (asc) {
      this.vmList.sort((a, b) =>
        (a[column as keyof VmEntity] > b[column as keyof VmEntity]) ? 1 :
          ((b[column as keyof VmEntity] > a[column as keyof VmEntity]) ? -1 : 0)
      );
    } else {
      this.vmList.sort((a, b) =>
        (a[column as keyof VmEntity] < b[column as keyof VmEntity]) ? 1 :
          ((b[column as keyof VmEntity] < a[column as keyof VmEntity]) ? -1 : 0)
      );
    }
  }

  filter(): void {
    this.router.navigate(['/vm/modal/filter'])
    this.modalService.open()
  }

  edit(vm: VmEntity): void {
    this.router.navigate([`/vm/modal/${vm.id}`])
    this.modalService.open()
  }

}
