import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NetEntity } from "./net-entity";
import { NetModal } from "./net-modal";

@Injectable({ providedIn: 'root' })
export class NetService {
    constructor(private http: HttpClient) { }
    private url = 'http://192.168.100.120:8080/spring/db/net/';
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

    getNetTable(): Observable<NetEntity[]> { return this.http.get<NetEntity[]>(`${this.url}table`) }
    getNetModal(netId: number): Observable<NetModal> { return this.http.get<NetModal>(`${this.url}modal?id=${encodeURIComponent(netId)}`) }
    newNet(data: NetModal): Observable<void> { return this.http.post<void>(`${this.url}new`, data, this.headers) }
    editNet(data: NetModal): Observable<void> { return this.http.post<void>(`${this.url}edit`, data, this.headers) }
}