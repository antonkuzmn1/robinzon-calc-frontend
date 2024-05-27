import {Component, OnDestroy, OnInit} from '@angular/core';
import {AsyncPipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {VmFilter, VmService} from "./vm.service";
import {VmRaw} from "./forms/vm-raw";
import {ModalService} from "../modal/modal.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {ModalComponent} from "../modal/modal.component";

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
    MatProgressSpinner,
    ModalComponent
  ],
  templateUrl: './vm.component.html',
  styleUrl: './vm.component.scss'
})
export class VmComponent implements OnInit, OnDestroy {

  loadingStopwatch$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  initDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  errorText$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  filterSpecs$: BehaviorSubject<VmFilter> = new BehaviorSubject<VmFilter>({
    name: '',
    cpuFrom: 0,
    cpuTo: 999,
    ramFrom: 0,
    ramTo: 999,
    ssdFrom: 0,
    ssdTo: 999,
    hddFrom: 0,
    hddTo: 999,
    runningTrue: false,
    runningFalse: false,
    fmEntityIdList: [],
    title: '',
    description: '',
  });

  tableColumns: {
    class: 'large' | 'medium' | 'small',
    viewName: string,
    field: string,
    isNumber: boolean,
  }[] = [
    {class: 'large', viewName: 'Name', field: 'name', isNumber: false},
    {class: 'small', viewName: 'Host', field: 'fmName', isNumber: false},
    {class: 'small', viewName: 'CPU', field: 'cpu', isNumber: true},
    {class: 'small', viewName: 'RAM', field: 'ram', isNumber: true},
    {class: 'small', viewName: 'SSD', field: 'ssd', isNumber: true},
    {class: 'small', viewName: 'HDD', field: 'hdd', isNumber: true},
    {class: 'small', viewName: 'State', field: 'state', isNumber: false},
  ]

  tableRows$: BehaviorSubject<VmEntity[]> = new BehaviorSubject<VmEntity[]>([]);

  constructor(
    private vmService: VmService,
    private modalService: ModalService,
  ) {
    this.loadingStopwatchController(10);

    this.getTable().then((): void => {
      this.initDone$.next(true);
    })

    this.modalStatusSub = this.modalService.getModalStatus().subscribe(status => {
      this.modalIsOpened = status;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.modalStatusSub) {
      this.modalStatusSub.unsubscribe();
    }
  }

  loadingStopwatchController(seconds: number): void {
    const intervalId: number = setInterval((): void => {
      const next: number = this.loadingStopwatch$.value + 1;
      this.loadingStopwatch$.next(next);

      if (next >= 100 * seconds) {
        this.errorText$.next('loading is too long')
      }

      if (this.errorText$.value.length > 0 || this.initDone$.value) {
        clearInterval(intervalId);
      }
    }, 10);
  }

  getFieldValue(row: any, field: string): any {
    switch (field) {
      case 'state':
        return row.state ? 'Running' : 'Off';
      default:
        return row[field as keyof any];
    }
  }

  private async getTable(): Promise<void> {
    return new Promise<void>((resolve, reject): void => {
      this.vmService.getVmTable(this.filterSpecs$.value).subscribe({
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
          this.sortTable('name', true);
          if (this.errorText$.value.length > 0) {
            this.errorText$.next('');
          }
          resolve();
        },
        error: (err: Error): void => {
          this.errorText$.next(err.message)
          reject();
        }
      });
    });
  };

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
    this.syncModalEntityList();
  }

  modalStatusSub: Subscription;
  modalIsOpened: boolean = false;

  filter(): void {
    this.modalService.open()
  }

  edit(vm: VmEntity): void {
    this.modalService.open()
  }

  syncModalEntityList(): void {
    this.modalService.entityList = this.tableRows$.value.map((vm: VmEntity): {
      id: string | number,
      name: string
    } => ({
      id: vm.id,
      name: vm.name
    }))
  }

}
