import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ClientDd } from '../client/client-dd';
import { ClientService } from '../client/client.service';
import { ModalComponent } from "../modal/modal.component";
import { ModalService } from '../modal/modal.service';
import { FmEntity } from './fm-entity';
import { FmModal } from './fm-modal';
import { FmService } from './fm.service';

@Component({
  selector: 'app-fm',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterLink,
    NgFor,
    NgIf,
    ModalComponent,
    FormsModule,
  ],
  templateUrl: './fm.component.html',
  styleUrl: '../../assets/styles/components/fm.component.sass',
})
export class FmComponent {
  title = 'angular';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fms: FmService,
    private modal: ModalService,
    private cs: ClientService,
  ) { }
  fmTable: FmEntity[] = [];
  fmModal: FmModal = new FmModal();
  delButtonText: string = "Delete";
  clientDd: ClientDd[] = [];
  clientActiveDD: boolean = false;

  ngOnInit() {
    this.route.fragment.subscribe(data => {
      try {
        const id: string | undefined = (data?.split('=')[1]);
        if (id === undefined) throw new Error();
        if (id === "") this.modal.close();
        else if (id === "new") { this.fmModal = new FmModal(); this.modal.open() }
        else if (parseInt(id) > 0) { this.fms.getFmModal(parseInt(id)).subscribe({ next: (data: FmModal) => { this.fmModal = data; this.modal.open() } }) }
        else throw new Error();
      } catch (e) { this.router.navigate([], { fragment: 'id=' }) }
    });
    this.getTable();
    // interval(5000).subscribe(() => {
    // this.loadData();
    // });
  }

  getTable() { this.fms.getFmTable().subscribe({ next: (data: FmEntity[]) => this.fmTable = data }) }
  updateFragmentId(id: string = "") { this.router.navigate([], { fragment: `id=${encodeURIComponent(id)}` }); }
  selectAllText(event: any) { event.target.select() }
  openModal(fmId: string): void { this.updateFragmentId(fmId) }
  closeModal(): void { this.updateFragmentId() }

  newFm(): void { this.fms.newFm(this.fmModal).subscribe({ next: () => this.getTable() }) }
  editFm(): void { this.fms.editFm(this.fmModal).subscribe({ next: () => this.getTable() }) }
  delFm(): void {
    console.log(this.fmModal);
    this.delButtonText = "Not working yet";
    setTimeout(() => {
      this.delButtonText = "Delete";
    }, 3000);
  }

  setClient(clientId: number = 0, clientName: string = ""): void {
    this.fmModal.clientId = clientId;
    this.fmModal.clientName = clientName;
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
