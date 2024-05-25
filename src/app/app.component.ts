/*

Copyright 2024 Anton Kuzmin (http://github.com/antonkuzmn1)

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

*/

import {AfterViewInit, Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AppData} from "./app-data";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatRipple} from "@angular/material/core";
import {BehaviorSubject} from "rxjs";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgForOf,
    MatRipple,
    AsyncPipe,
    MatProgressSpinner,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  title: string = 'Calc';

  loadingStopwatch$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  initDone$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  errorText$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  navbarLinks: {path: string, viewName: string}[] = [
    {path: '/auth', viewName: 'Auth'},
    // {path: '/settings', viewName: 'Settings'},
    {path: '/vm', viewName: 'VM'},
    // {path: '/fm', viewName: 'FM'},
    // {path: '/client', viewName: 'Client'},
    // {path: '/net', viewName: 'Net'},
    // {path: '/vpn', viewName: 'VPN'},
    // {path: '/print', viewName: 'Print'},
  ]

  vmData: AppData = {modal: null, filter: null}

  constructor() {
    // noinspection DuplicatedCode
    const intervalId: number = setInterval((): void => {
      const next: number = this.loadingStopwatch$.value + 1;
      this.loadingStopwatch$.next(next);

      if (next >= 10000) {
        this.errorText$.next('loading is too long')
      }

      if (this.errorText$.value.length > 0 || this.initDone$.value) {
        clearInterval(intervalId);
      }
    }, 1);
  }

  ngAfterViewInit(): void {
    setTimeout((): void => {
      this.initDone$.next(true);
      if (this.errorText$.value.length > 0) {
        this.errorText$.next('');
      }
    }, 0);
  }
}
