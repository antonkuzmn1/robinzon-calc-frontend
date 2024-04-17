import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientDd } from '../client/client-dd';
import { ClientService } from '../client/client.service';
import { VmPrice } from '../vm/vm-price';
import { VmService } from '../vm/vm.service';

@Component({
  selector: 'app-print',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './print.component.html',
  styleUrl: '../../assets/styles/components/print.component.sass'
})
export class PrintComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vs: VmService,
    private cs: ClientService,
  ) { }
  vmPrice: VmPrice = new VmPrice();
  screenWidth: number = window.innerWidth;
  clientDd: ClientDd[] = [];
  selectedClient: { id: number, name: string } = { id: 0, name: "not selected" }

  ngOnInit() {
    this.cs.getClientDd().subscribe({ next: (data: ClientDd[]) => this.clientDd = data });
    console.log('screen width:', this.screenWidth);
    // this.vs.getVmTable().subscribe({ next: (data: VmEntity[]) => console.log(data) });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = window.innerWidth;
    // console.log('screen width:', this.screenWidth);
  }
}
