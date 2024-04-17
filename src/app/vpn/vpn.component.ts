import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientDd } from '../client/client-dd';
import { ClientService } from '../client/client.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../modal/modal.service';
import { VpnEntity } from './vpn-entity';
import { VpnModal } from './vpn-modal';
import { VpnService } from './vpn.service';

@Component({
  selector: 'app-vpn',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterLink,
    NgFor,
    NgIf,
    ModalComponent,
    FormsModule,
  ],
  templateUrl: './vpn.component.html',
  styleUrl: '../../assets/styles/components/vpn.component.sass'
})
export class VpnComponent {
  title = 'Angular';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vs: VpnService,
    private modal: ModalService,
    private cs: ClientService,
  ) { }
  vpnTable: VpnEntity[] = [];
  vpnModal: VpnModal = new VpnModal();
  delButtonText: string = "Delete";
  clientDd: ClientDd[] = []
  clientActiveDD: boolean = false;

  ngOnInit() {
    this.route.fragment.subscribe(data => {
      try {
        const id: string | undefined = (data?.split('=')[1]);
        if (id === undefined) throw new Error();
        if (id === "") this.modal.close();
        else if (id === "new") { this.vpnModal = new VpnModal(); this.modal.open() }
        else if (parseInt(id) > 0) { this.vs.getModal(parseInt(id)).subscribe({ next: (data: VpnModal) => { this.vpnModal = data; this.modal.open() } }) }
        else throw new Error();
      } catch (e) { this.router.navigate([], { fragment: 'id=' }) }
    });
    this.getTable();
    // interval(5000).subscribe(() => {
    // this.loadData();
    // });
  }

  getTable() { this.vs.getTable().subscribe({ next: (data: VpnEntity[]) => this.vpnTable = data }) }
  updateFragmentId(id: string = "") { this.router.navigate([], { fragment: `id=${encodeURIComponent(id)}` }); }
  selectAllText(event: any) { event.target.select() }
  openModal(vpnId: string): void { this.updateFragmentId(vpnId) }
  closeModal(): void { this.updateFragmentId() }

  newVpn(): void { this.vs.newVpn(this.vpnModal).subscribe({ next: () => this.getTable() }) }
  // newNet(): void { console.log(this.netModal) }
  editVpn(): void { this.vs.editVpn(this.vpnModal).subscribe({ next: () => this.getTable() }) }
  delVpn(): void {
    console.log(this.vpnModal);
    this.delButtonText = "Not working yet";
    setTimeout(() => {
      this.delButtonText = "Delete";
    }, 3000);
  }

  setClient(clientId: number = 0, clientName: string = ""): void {
    this.vpnModal.clientId = clientId;
    this.vpnModal.clientName = clientName;
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
