import {Component} from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatTab, MatTabContent, MatTabGroup} from "@angular/material/tabs";
import {SettingsComponent} from "../settings/settings.component";
import {AuthComponent} from "../auth/auth.component";
import {VmComponent} from "../vm/vm.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    MatTabGroup,
    MatTabContent,
    SettingsComponent,
    MatTab,
    AuthComponent,
    VmComponent,
  ],
  template: `
    <section>
      <nav>
        <a routerLink="/auth" routerLinkActive="active" draggable="false">Auth</a>
        <a routerLink="/settings" routerLinkActive="active" draggable="false">Settings</a>
        <a routerLink="/vm" routerLinkActive="active" draggable="false">VM</a>
        <a routerLink="/fm" routerLinkActive="active" draggable="false">FM</a>
        <a routerLink="/client" routerLinkActive="active" draggable="false">Client</a>
        <a routerLink="/net" routerLinkActive="active" draggable="false">Net</a>
        <a routerLink="/vpn" routerLinkActive="active" draggable="false">VPN</a>
        <a routerLink="/print" routerLinkActive="active" draggable="false">Print</a>
      </nav>
    </section>
  `,
  styleUrl: '../../assets/styles/components/navbar.component.sass'
})
export class NavbarComponent {
}
