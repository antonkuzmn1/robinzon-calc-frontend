import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {NavbarComponent} from "./navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    NavbarComponent,
  ],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styleUrl: '../assets/styles/components/app.component.sass'
})
export class AppComponent implements OnInit {
  title = 'Angular';

  constructor(private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
  }
}
