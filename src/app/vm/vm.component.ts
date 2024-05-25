import {Component, OnInit} from '@angular/core';
import {AsyncPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterOutlet} from "@angular/router";
import {AppComponent} from "../app.component";
import {AppData} from "../app-data";
import {VmService} from "./vm.service";
import {VmRaw} from "./forms/vm-raw";
import {ModalService} from "../modal/modal.service";
import {BehaviorSubject} from "rxjs";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

export interface VmEntity {
  id: string,
  clientName: string,
  name: string,
  fmName: string
  cpu: number,
  ram: number,
  ssd: number,
  hdd: number,
  state: boolean,
}

@Component({
  selector: 'app-vm',
  standalone: true,
  imports: [
    NgForOf,
    RouterOutlet,
    KeyValuePipe,
    AsyncPipe,
    NgIf,
    MatProgressSpinner
  ],
  templateUrl: './vm.component.html',
  styleUrl: './vm.component.sass'
})
export class VmComponent implements OnInit {

  loadingStopwatch$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  initDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  errorText$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  tableColumns: {
    class: 'large' | 'medium' | 'small',
    viewName: string,
    field: string
  }[] = [
    {class: 'large', viewName: 'Name', field: 'name'},
    {class: 'small', viewName: 'Host', field: 'fmName'},
    {class: 'small', viewName: 'CPU', field: 'cpu'},
    {class: 'small', viewName: 'RAM', field: 'ram'},
    {class: 'small', viewName: 'SSD', field: 'ssd'},
    {class: 'small', viewName: 'HDD', field: 'hdd'},
    {class: 'small', viewName: 'State', field: 'state'},
  ]

  tableRows$: BehaviorSubject<VmEntity[]> = new BehaviorSubject<VmEntity[]>([]);

  constructor(
    private vmService: VmService,
    private modalService: ModalService,
    private app: AppComponent,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.fragmentManager();

    const intervalId: number = setInterval((): void => {
      const next: number = this.loadingStopwatch$.value + 1;
      this.loadingStopwatch$.next(next);

      if (next >= 500) {
        this.errorText$.next('loading is too long')
      }

      if (this.errorText$.value.length > 0 || this.initDone$.value) {
        clearInterval(intervalId);
      }
    }, 1);
  }

  ngOnInit(): void {
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

  getFieldValue(row: any, field: string): any {
    switch (field) {

      case 'state':
        return row.state ? 'Running' : 'Off';

      default:
        return row[field as keyof any];
    }
  }

  private getTable = (data: AppData = this.app.vmData): void => {
    console.log(data)
    this.vmService.getVmTable().subscribe({
      next: (data: VmRaw[]): void => {
        this.tableRows$.next(data.map((row: VmRaw) => {
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
        }));
        this.modalService.entityList = this.tableRows$.value.map((vm: VmEntity): {
          id: string | number,
          name: string
        } => ({
          id: vm.id,
          name: vm.name
        }))

        this.initDone$.next(true);
        if (this.errorText$.value.length > 0) {
          this.errorText$.next('');
        }
        /*
         then:
          1. set new vmData from backend
          2. put this encoded vmData into url
         */
        // const vmData: AppData = this.app.vmData
        // const vmDataJson: string = JSON.stringify(vmData)
        // const vmDataEncoded: string = encodeURIComponent(vmDataJson)
        // this.router.navigate([], {fragment: vmDataEncoded})
      },
      error: (err: Error): void => {
        this.errorText$.next(err.message)
      }
    });
  };

  /**
   * Sort table
   * @param column - name of the column
   * @param asc - mark as true if ascending. mark as false if descending
   */
  sortTable(column: string, asc: boolean): void {
    const table: VmEntity[] = this.tableRows$.value;
    if (asc) {
      table.sort((a, b): number =>
        (a[column as keyof VmEntity] > b[column as keyof VmEntity]) ? 1 :
          ((b[column as keyof VmEntity] > a[column as keyof VmEntity]) ? -1 : 0)
      );
    } else {
      table.sort((a, b): number =>
        (a[column as keyof VmEntity] < b[column as keyof VmEntity]) ? 1 :
          ((b[column as keyof VmEntity] < a[column as keyof VmEntity]) ? -1 : 0)
      );
    }
    this.tableRows$.next(table);
  }

  filter(): void {
    this.router.navigate(['/vm/modal/filter']).then((_r: boolean): void => {
    });
    this.modalService.open()
  }

  edit(vm: VmEntity): void {
    this.router.navigate([`/vm/modal/${vm.id}`]).then((_r: boolean): void => {
    });
    this.modalService.open()
  }

}
