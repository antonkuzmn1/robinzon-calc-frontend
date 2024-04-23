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

import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {VmRaw} from "./forms/vm-raw";


@Injectable({providedIn: 'root'})
export class VmService {
  constructor(
    private http: HttpClient,
  ) {
  }

  private url: string = 'http://192.168.100.120:8080/api/data/vm';

  private headers: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  /**
   * Get table data
   */
  getVmTable(): Observable<VmRaw[]> {
    return this.http.get<VmRaw[]>(this.url)
  }

  // getVmTable(): Observable<VmEntity[]> { return this.http.post<VmEntity[]>(`${this.url}table`, this.filter.vmFilter, this.headers) }
  // saveVm(data: VmModal): Observable<void> { return this.http.post<void>(`${this.url}save`, data, this.headers) }
  // getVmModal(vmId: string): Observable<VmModal> { return this.http.get<VmModal>(`${this.url}modal?id=${encodeURIComponent(vmId)}`) }

}
