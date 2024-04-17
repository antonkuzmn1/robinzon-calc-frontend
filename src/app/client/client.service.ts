import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClientDd } from "./client-dd";
import { ClientEntity } from "./client-entity";
import { ClientModal } from "./client-modal";

@Injectable({ providedIn: 'root' })
export class ClientService {
    constructor(private http: HttpClient) { }
    private url = 'http://192.168.100.120:8080/spring/db/client/';
    headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

    getClientTable(): Observable<ClientEntity[]> { return this.http.get<ClientEntity[]>(`${this.url}table`) }
    newClient(data: ClientModal): Observable<void> { return this.http.post<void>(`${this.url}new`, data, this.headers) }
    editClient(data: ClientModal): Observable<void> { return this.http.post<void>(`${this.url}edit`, data, this.headers) }
    getClientModal(clientId: number): Observable<ClientModal> { return this.http.get<ClientModal>(`${this.url}modal?clientId=${encodeURIComponent(clientId)}`) }
    getClientDd(): Observable<ClientDd[]> { return this.http.get<ClientDd[]>(`${this.url}dd`) }
}