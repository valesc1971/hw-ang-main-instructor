import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Memo} from '../Memo';

@Injectable({
  providedIn: 'root'
})
export class MemosService {

  constructor(private http: HttpClient) { }

  getByUserID(userID: number): Observable<Memo[]> {
    return this.http
      .get<Memo[]>(`http://localhost:5000/memos?userID=${userID}`)
  }

  add(memo: Memo): Observable<undefined> {
    return this.http.post<undefined>('http://localhost:5000/memos', memo)
  }
}

