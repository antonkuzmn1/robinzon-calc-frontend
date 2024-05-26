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

import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgForOf} from "@angular/common";
import {MatRipple} from "@angular/material/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgForOf,
    MatRipple,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title: string = 'Calc';

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

}
