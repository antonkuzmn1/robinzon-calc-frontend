import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {VmRaw} from "./forms/vm-raw";

export interface VmFilter {
  name: string,
  cpuFrom: number,
  cpuTo: number,
  ramFrom: number,
  ramTo: number,
  ssdFrom: number,
  ssdTo: number,
  hddFrom: number,
  hddTo: number,
  runningTrue: boolean,
  runningFalse: boolean,
  fmEntityIdList: number[],
  title: string,
  description: string,
}

@Injectable({
  providedIn: 'root'
})
export class VmService {

  constructor(
    private http: HttpClient,
  ) {
  }

  private url: string = 'http://192.168.100.120:8080/api/data/vm';

  // noinspection JSUnusedLocalSymbols
  private headers: { headers: HttpHeaders } = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getVmTable(filter: VmFilter): Observable<VmRaw[]> {
    return this.http.post<VmRaw[]>(this.url, filter, this.headers)
  }

  // getVmTable(): Observable<VmEntity[]> { return this.http.post<VmEntity[]>(`${this.url}table`, this.filter.vmFilter, this.headers) }
  // saveVm(data: VmModal): Observable<void> { return this.http.post<void>(`${this.url}save`, data, this.headers) }
  // getVmModal(vmId: string): Observable<VmModal> { return this.http.get<VmModal>(`${this.url}modal?id=${encodeURIComponent(vmId)}`) }

}
