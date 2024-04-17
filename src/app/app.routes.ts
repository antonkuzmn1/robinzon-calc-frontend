import { Routes } from '@angular/router';
import {SettingsComponent} from "./settings/settings.component";
import {VmComponent} from "./vm/vm.component";
import {FmComponent} from "./fm/fm.component";
import {ClientComponent} from "./client/client.component";
import {NetComponent} from "./net/net.component";
import {VpnComponent} from "./vpn/vpn.component";
import {PrintComponent} from "./print/print.component";
import {AuthComponent} from "./auth/auth.component";

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'vm', component: VmComponent },
  { path: 'fm', component: FmComponent },
  { path: 'client', component: ClientComponent },
  { path: 'net', component: NetComponent },
  { path: 'vpn', component: VpnComponent },
  { path: 'print', component: PrintComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];
