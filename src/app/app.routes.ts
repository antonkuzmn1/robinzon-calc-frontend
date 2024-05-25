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

import {Routes} from '@angular/router';
import {AccountComponent} from "./account/account.component";
import {SettingsComponent} from "./settings/settings.component";
import {VmComponent} from "./vm/vm.component";
import {ModalComponent} from "./modal/modal.component";
import {ModalFilterComponent} from "./modal/modal-filter/modal-filter.component";
import {ModalNewComponent} from "./modal/modal-new/modal-new.component";
import {ModalIdComponent} from "./modal/modal-id/modal-id.component";
import {FmComponent} from "./fm/fm.component";
import {ClientComponent} from "./client/client.component";
import {NetComponent} from "./net/net.component";
import {VpnComponent} from "./vpn/vpn.component";
import {PrintComponent} from "./print/print.component";

/**
 * Standard router
 */
export const routes: Routes = [
  {path: 'auth', component: AccountComponent},
  {path: 'settings', component: SettingsComponent},
  {
    path: 'vm', component: VmComponent, children: [
      {
        path: 'modal', component: ModalComponent, children: [
          {path: 'filter', component: ModalFilterComponent},
          {path: 'new', component: ModalNewComponent},
          {path: ':id', component: ModalIdComponent}
        ]
      }
    ]
  },
  {path: 'fm', component: FmComponent},
  {path: 'client', component: ClientComponent},
  {path: 'net', component: NetComponent},
  {path: 'vpn', component: VpnComponent},
  {path: 'print', component: PrintComponent},
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: '**', redirectTo: 'auth', pathMatch: 'full'},
];
