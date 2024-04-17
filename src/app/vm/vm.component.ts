import {Component, OnInit} from '@angular/core';
import {VmService} from "./vm.service";
import {VmEntity} from "./vm-entity";
import {VmRaw} from "./vm-raw";
import {NgFor} from "@angular/common";

@Component({
  imports: [
    NgFor
  ],
  selector: 'app-vm',
  standalone: true,
  styleUrl: '../../assets/styles/components/vm.component.sass',
  template: `
    <section>
      <div>
        <table class='header'>
          <tr>
            <th class='button'><button>Action</button></th>
            <th class='large'>Name</th>
            <th class='small'>FM</th>
            <th class='small'>CPU</th>
            <th class='small'>RAM</th>
            <th class='small'>SSD</th>
            <th class='small'>HDD</th>
            <th class='small'>State</th>
          </tr>
        </table>
        <table class='content'>
          <tr *ngFor="let vm of vmList">
            <td class='button'><button>Edit</button></td>
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
  title = 'Angular';

  constructor(
    private vmService: VmService
  ) {
  }

  vmList: VmEntity[] = []

  ngOnInit() {
    this.getTable()
  }

  getTable(): void {
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
        console.log(this.vmList);
      }
    });
  }

}
