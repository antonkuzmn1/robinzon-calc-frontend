import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { VpnEntity } from "./vpn-entity";
import { VpnModal } from "./vpn-modal";

@Injectable({ providedIn: 'root' })
export class VpnService {
    constructor(private http: HttpClient) { }
    private url = 'http://192.168.100.120:8080/spring/db/vpn/';
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

    getTable(): Observable<VpnEntity[]> { return this.http.get<VpnEntity[]>(`${this.url}table`) }
    getModal(vpnId: number): Observable<VpnModal> { return this.http.get<VpnModal>(`${this.url}modal?id=${encodeURIComponent(vpnId)}`) }
    newVpn(data: VpnModal): Observable<void> { return this.http.post<void>(`${this.url}new`, data, this.headers) }
    editVpn(data: VpnModal): Observable<void> { return this.http.post<void>(`${this.url}edit`, data, this.headers) }
}
