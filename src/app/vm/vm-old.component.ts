// import { CommonModule, NgFor, NgIf } from '@angular/common';
// import { Component, OnInit } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ClientDd } from '../client/client-dd';
// import { ClientService } from '../client/client.service';
// import { FilterService } from '../filter.service';
// import { FmDd } from '../fm/fm-dd';
// import { FmService } from '../fm/fm.service';
// import { ModalComponent } from "../modal/modal.component";
// import { ModalService } from '../modal/modal.service';
// import { VmEntity } from './vm-entity';
// import { VmModal } from './vm-modal';
// import { VmPrice } from './vm-price';
// import { VmService } from './vm.service';
//
// @Component({
//   selector: 'app-vm-old',
//   standalone: true,
//   imports: [
//     NgFor,
//     NgIf,
//     ModalComponent,
//     CommonModule,
//     FormsModule,
//   ],
//   template: `
//     <section>
//
//     </section>
//   `,
//   styleUrl: '../../assets/styles/components/vm.component.sass',
// })
// export class VmComponent implements OnInit {
//   title = 'Angular';
//   constructor(
//     private route: ActivatedRoute,
//     private router: Router,
//     private modal: ModalService,
//     private vms: VmService,
//     private cs: ClientService,
//     private filter: FilterService,
//     private fs: FmService,
//   ) { }
//   vmTable: VmEntity[] = [];
//   vmModal: VmModal = new VmModal();
//   clientDd: ClientDd[] = [];
//   fmDd: FmDd[] = [];
//   vmPrice: VmPrice = new VmPrice();
//
//   clientActiveDD: boolean = false;
//   modalSettings: boolean = false;
//   filterIsOpened: boolean = false;
//
//   tempTitle: string = "";
//   tempName: string = "";
//
//   async ngOnInit() {
//     this.route.fragment.subscribe(data => {
//       try {
//         const id: string | undefined = data?.split('&')[0].split('=')[1];
//         const filterJson: string | undefined = data?.split('&')[1].split('=')[1];
//         if (id === undefined || filterJson === undefined) throw new Error();
//         this.filter.vmFilter = JSON.parse(decodeURI(filterJson));
//         if (id === "") this.modal.close();
//         else if (id === "settings") { this.modalSettings = true; this.modal.open(); }
//         else if (id !== "") this.vms.getVmModal(id).subscribe({
//           next: (data: VmModal) => { this.modalSettings = false; this.vmModal = data; this.modal.open() }
//         });
//         else throw new Error();
//       } catch (e) { this.updateFragmentFilter() }
//     });
//     let isDefault = false;
//     if (this.filter.isDefault()) isDefault = true;
//     this.getTable();
//     this.getClient(isDefault);
//     this.getFm(isDefault);
//   }
//
//   getTable(): void { this.vms.getVmTable().subscribe({ next: (data: VmEntity[]) => { this.vmTable = data } }) }
//
//   updateFragmentId(id: string = ""): void { this.router.navigate([], { fragment: `id=${encodeURI(id)}&filter=${encodeURI(JSON.stringify(this.filter.vmFilter))}` }) }
//   updateFragmentFilter(): void {
//     this.route.fragment.subscribe(data => {
//       try {
//         const id: string | undefined = data?.split('&')[0].split('=')[1];
//         if (id === undefined) throw new Error();
//         else this.router.navigate([], { fragment: `id=${id}&filter=${encodeURI(JSON.stringify(this.filter.vmFilter))}` });
//       } catch (e) { this.router.navigate([], { fragment: `id=&filter=${encodeURI(JSON.stringify(this.filter.vmFilter))}` }) }
//     });
//   }
//
//   openModal(vmId: string): void { this.updateFragmentId(vmId) }
//   saveVm(): void { this.vms.saveVm(this.vmModal).subscribe({ next: () => this.getTable() }) }
//   closeModal(): void { this.updateFragmentId() }
//
//   getClient(isDefault: boolean): void {
//     this.cs.getClientDd().subscribe({
//       next: (data: ClientDd[]) => {
//         this.clientDd = data;
//         if (isDefault) for (let c of this.clientDd) this.filter.vmFilter.client.in.push(c.clientId);
//         this.getTable();
//       }
//     })
//   }
//   setClient(clientId: number = 0, clientName: string = ""): void { this.vmModal.clientId = clientId; this.vmModal.clientName = clientName; this.clientActiveDD = false }
//   openClientDd(): void { if (this.clientActiveDD) this.clientActiveDD = false; else this.clientActiveDD = true }
//
//   getFm(isDefault: boolean): void {
//     this.fs.getFmDd().subscribe({
//       next: (data: FmDd[]) => {
//         this.fmDd = data;
//         if (isDefault) for (let f of this.fmDd) this.filter.vmFilter.fm.in.push(f.fmId);
//         this.getTable();
//       }
//     })
//   }
//
//   filterState(): void { if (this.filterIsOpened) this.filterIsOpened = false; else this.filterIsOpened = true }
//   filterClientCheck(clientId: number): boolean {
//     if (clientId === 0) return this.filter.vmFilter.client.nul;
//     else return (this.filter.vmFilter.client.in).includes(clientId);
//   }
//   filterFmCheck(fmId: number): boolean { return (this.filter.vmFilter.fm.in).includes(fmId) }
//   filterTitleChange(): void { this.filter.vmFilter.title = this.tempTitle; this.updateFragmentFilter() }
//   filterClientChange(clientId: number): void {
//     switch (clientId) {
//       case 0:
//         if (this.filter.vmFilter.client.nul) this.filter.vmFilter.client.nul = false;
//         else this.filter.vmFilter.client.nul = true; break;
//       default:
//         if (this.filterClientCheck(clientId)) this.filter.vmFilter.client.in.splice(this.filter.vmFilter.client.in.indexOf(clientId), 1);
//         else this.filter.vmFilter.client.in.push(clientId);
//     }
//     this.updateFragmentFilter();
//   }
//   filterNameChange(): void { this.filter.vmFilter.name = this.tempName; this.updateFragmentFilter() }
//   filterFmChange(fmId: number): void {
//     if (this.filterFmCheck(fmId)) this.filter.vmFilter.fm.in.splice(this.filter.vmFilter.fm.in.indexOf(fmId), 1);
//     else this.filter.vmFilter.fm.in.push(fmId);
//     this.updateFragmentFilter();
//   }
//   filterRunning(change: boolean): boolean {
//     if (change) {
//       if (this.filter.vmFilter.state.running) this.filter.vmFilter.state.running = false;
//       else this.filter.vmFilter.state.running = true;
//     }
//     return this.filter.vmFilter.state.running;
//   }
//   filterOff(change: boolean): boolean {
//     if (change) {
//       if (this.filter.vmFilter.state.off) this.filter.vmFilter.state.off = false;
//       else this.filter.vmFilter.state.off = true;
//     }
//     return this.filter.vmFilter.state.off;
//   }
//
// }
