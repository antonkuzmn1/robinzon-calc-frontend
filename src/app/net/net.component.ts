import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientDd } from '../client/client-dd';
import { ClientService } from '../client/client.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../modal/modal.service';
import { NetEntity } from './net-entity';
import { NetModal } from './net-modal';
import { NetService } from './net.service';

@Component({
  selector: 'app-net',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterLink,
    NgFor,
    NgIf,
    ModalComponent,
    FormsModule,
  ],
  templateUrl: './net.component.html',
  styleUrl: '../../assets/styles/components/net.component.sass'
})
export class NetComponent {
  title = 'angular';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ns: NetService,
    private modal: ModalService,
    private cs: ClientService,
  ) { }
  netTable: NetEntity[] = [];
  netModal: NetModal = new NetModal();
  delButtonText: string = "Delete";
  clientDd: ClientDd[] = [];
  clientActiveDD: boolean = false;


  ngOnInit() {
    this.route.fragment.subscribe(data => {
      try {
        const id: string | undefined = (data?.split('=')[1]);
        if (id === undefined) throw new Error();
        if (id === "") this.modal.close();
        else if (id === "new") { this.netModal = new NetModal(); this.modal.open() }
        else if (parseInt(id) > 0) { this.ns.getNetModal(parseInt(id)).subscribe({ next: (data: NetModal) => { this.netModal = data; this.modal.open() } }) }
        else throw new Error();
      } catch (e) { this.router.navigate([], { fragment: 'id=' }) }
    });
    this.getTable();
    // interval(5000).subscribe(() => {
    // this.loadData();
    // });
  }

  getTable() { this.ns.getNetTable().subscribe({ next: (data: NetEntity[]) => this.netTable = data }) }
  updateFragmentId(id: string = "") { this.router.navigate([], { fragment: `id=${encodeURIComponent(id)}` }); }
  selectAllText(event: any) { event.target.select() }
  openModal(netId: string): void { this.updateFragmentId(netId) }
  closeModal(): void { this.updateFragmentId() }

  newNet(): void { this.ns.newNet(this.netModal).subscribe({ next: () => this.getTable() }) }
  // newNet(): void { console.log(this.netModal) }
  editNet(): void { this.ns.editNet(this.netModal).subscribe({ next: () => this.getTable() }) }
  delNet(): void {
    console.log(this.netModal);
    this.delButtonText = "Not working yet";
    setTimeout(() => {
      this.delButtonText = "Delete";
    }, 3000);
  }

  setClient(clientId: number = 0, clientName: string = ""): void {
    this.netModal.clientId = clientId;
    this.netModal.clientName = clientName;
    this.clientActiveDD = false;
  }
  openClientDd(): void {
    if (this.clientActiveDD) this.clientActiveDD = false;
    else this.cs.getClientDd().subscribe({
      next: (data: ClientDd[]) => {
        this.clientDd = data;
        this.clientActiveDD = true;
      }
    });
  }
}
