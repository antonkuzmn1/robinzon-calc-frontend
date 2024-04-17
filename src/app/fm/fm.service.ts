import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FmDd } from "./fm-dd";
import { FmEntity } from "./fm-entity";
import { FmModal } from "./fm-modal";

@Injectable({ providedIn: 'root' })
export class FmService {
    constructor(private http: HttpClient) { }
    private url = 'http://192.168.100.120:8080/spring/db/fm/';
    private headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }

    getFmTable(): Observable<FmEntity[]> { return this.http.get<FmEntity[]>(`${this.url}table`) }
    getFmModal(fmId: number): Observable<FmModal> { return this.http.get<FmModal>(`${this.url}modal?id=${encodeURIComponent(fmId)}`) }
    newFm(data: FmModal): Observable<void> { return this.http.post<void>(`${this.url}new`, data, this.headers) }
    editFm(data: FmModal): Observable<void> { return this.http.post<void>(`${this.url}edit`, data, this.headers) }
    getFmDd(): Observable<FmDd[]> { return this.http.get<FmDd[]>(`${this.url}dd`) }
}