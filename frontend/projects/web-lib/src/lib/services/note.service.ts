import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from '../models/note';
import { environment } from '../../../../web-app/src/environments/environment.prod';

@Injectable({ providedIn: 'root' })
export class NoteService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/notes`;

  getAll(query?: string): Observable<Note[]> {
    const params = query ? new HttpParams().set('q', query) : undefined;
    return this.http.get<Note[]>(this.apiUrl, { params });
  }

  get(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.apiUrl}/${id}`);
  }

  create(dto: Partial<Note>): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, dto);
  }

  update(id: string, dto: Partial<Note>): Observable<Note> {
    return this.http.put<Note>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
