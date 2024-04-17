import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../modal/modal.service';
import { ClientEntity } from './client-entity';
import { ClientModal } from './client-modal';
import { ClientService } from './client.service';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    HttpClientModule,
    NgFor,
    NgIf,
    ModalComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './client.component.html',
  styleUrl: '../../assets/styles/components/client.component.sass'
})
export class ClientComponent implements OnInit {
  title = 'angular';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modal: ModalService,
    private cs: ClientService,
  ) { }
  clientTable: ClientEntity[] = [];
  clientModal: ClientModal = new ClientModal(0, "", "", 0, "", new Date(), "");
  dateDay: number = 0;
  dateMon: number = 0;
  dateYer: number = 0;
  delButtonText: string = "Delete";

  ngOnInit(): void {
    this.route.fragment.subscribe(data => {
      try {
        const id: string | undefined = (data?.split('=')[1]);
        if (id === undefined) throw new Error();
        if (id === "") this.modal.close();
        else if (id === "new") {
          const date: Date = new Date();
          this.dateDay = date.getDate(); this.dateMon = date.getMonth() + 1; this.dateYer = date.getFullYear();
          this.clientModal = new ClientModal(0, "", "", 0, "", date, ""); this.modal.open();
        } else if (parseInt(id) > 0) {
          this.cs.getClientModal(parseInt(id)).subscribe({
            next: (data: ClientModal) => {
              this.clientModal = data;
              const date: Date = new Date(this.clientModal.clientContrDate);
              this.dateDay = date.getDate(); this.dateMon = date.getMonth() + 1; this.dateYer = date.getFullYear();
              this.modal.open();
            }
          });
        } else throw new Error();
      } catch (e) { this.router.navigate([], { fragment: 'id=' }) }
    });
    this.getTable();
  }

  getTable(): void { this.cs.getClientTable().subscribe({ next: (data: ClientEntity[]) => { this.clientTable = data } }) }
  updateFragmentId(id: string = "") { this.router.navigate([], { fragment: `id=${encodeURIComponent(id)}` }); }
  selectAllText(event: any) { event.target.select() }
  checkDiscount(): void { const value = this.clientModal.clientDiscount; if (value < 0 || value > 100 || isNaN(value)) { this.clientModal.clientDiscount = 0 } }
  openModal(clientId: string): void { this.updateFragmentId(clientId) }
  closeModal(): void { this.updateFragmentId(); this.delButtonText = "Delete"; }
  newClient(): void { this.cs.newClient(this.clientModal).subscribe({ next: () => this.getTable() }); }
  editClient(): void { this.cs.editClient(this.clientModal).subscribe({ next: () => this.getTable() }); }
  delClient(): void {
    console.log(this.clientModal);
    this.delButtonText = "Not working yet";
    setTimeout(() => {
      this.delButtonText = "Delete";
    }, 3000);
  }
  toDate(): void {
    if (this.dateYer < 100 && this.dateYer >= 10) { this.dateYer = 20 + this.dateYer }
    else if (this.dateYer < 10) { this.dateYer = 200 + this.dateYer }
    try { this.clientModal.clientContrDate = new Date(+this.dateYer, +this.dateMon - 1, +this.dateDay) }
    catch (e) { this.clientModal.clientContrDate = new Date() }
  }

}
