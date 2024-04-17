import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FilterService } from "../filter.service";
import { VmEntity } from "./vm-entity";
import { VmModal } from "./vm-modal";
import {VmRaw} from "./vm-raw";

@Injectable({ providedIn: 'root' })
export class VmService {
    constructor(
        private http: HttpClient,
        private filter: FilterService,
    ) { }
    private url = 'http://192.168.100.120:8080/api/data/vm';
    // private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

  getVmTable(): Observable<VmRaw[]> { return this.http.get<VmRaw[]>(this.url) }

    // getVmTable(): Observable<VmEntity[]> { return this.http.post<VmEntity[]>(`${this.url}table`, this.filter.vmFilter, this.headers) }
    // saveVm(data: VmModal): Observable<void> { return this.http.post<void>(`${this.url}save`, data, this.headers) }
    // getVmModal(vmId: string): Observable<VmModal> { return this.http.get<VmModal>(`${this.url}modal?id=${encodeURIComponent(vmId)}`) }

}
