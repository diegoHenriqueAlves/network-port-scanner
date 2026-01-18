import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import type { portsProps } from '../type/port-type'

@Injectable({
  providedIn: 'root',
})
export class PortService {
  private apiUrl = 'http://localhost:3000/api/doors';

  constructor(private http: HttpClient) {}

  getPorts(): Observable<portsProps[]> {
    return  this.http.get<portsProps[]>(this.apiUrl);
  }
}
