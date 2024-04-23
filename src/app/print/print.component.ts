import {CommonModule, NgFor, NgIf} from '@angular/common';
import {Component, HostListener, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-print',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    CommonModule,
    FormsModule,
  ],
  template: `
    <section>
      <div class="main">
        <h1>{{ screenWidth }}</h1>
      </div>
    </section>
  `,
  styleUrl: '../../assets/styles/components/print.component.sass'
})
export class PrintComponent implements OnInit {
  constructor() {
  }

  screenWidth: number = window.innerWidth;

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.screenWidth = window.innerWidth;
  }
}
