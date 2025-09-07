import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { NoteService } from './note.service';
import { Note } from '../models/note';
import { environment } from '../../../../web-app/src/environments/environment.prod';

describe('NoteService', () => {
  let service: NoteService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/notes`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(NoteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all notes', () => {
    const mockNotes: Note[] = [
      { id: '1', title: 'Test 1', content: 'Content 1', createdAt: '2025-09-06T10:00:00Z' },
      { id: '2', title: 'Test 2', content: 'Content 2', createdAt: '2025-09-06T11:00:00Z' },
    ];

    service.getAll().subscribe((notes) => {
      expect(notes).toEqual(mockNotes);
      expect(notes.length).toBe(2);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockNotes);
  });

  it('should get all notes with search query', () => {
    const query = 'test';
    service.getAll(query).subscribe();

    const req = httpMock.expectOne(`${apiUrl}?q=${query}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('q')).toBe(query);
  });

  it('should get note by id', () => {
    const mockNote: Note = {
      id: '1',
      title: 'Test',
      content: 'Content',
      createdAt: '2025-09-06T10:00:00Z',
    };

    service.get('1').subscribe((note) => {
      expect(note).toEqual(mockNote);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockNote);
  });

  it('should create note', () => {
    const newNote = { title: 'New', content: 'Content' };

    service.create(newNote).subscribe();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newNote);
  });

  it('should delete note', () => {
    service.delete('1').subscribe();

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
  });
});
