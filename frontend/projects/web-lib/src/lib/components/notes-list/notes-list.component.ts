import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteService } from '../../services/note.service';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap, startWith } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Observable } from 'rxjs';
import { Note } from '../../models/note';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { NotesHeaderComponent } from '../notes-header/notes-header.component';
import { NotesSearchComponent } from '../notes-search/notes-search.component';
import { NoteCardComponent } from '../note-card/note-card.component';

@Component({
  selector: 'notes-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatInputModule,
    TranslateModule,
    NotesHeaderComponent,
    NotesSearchComponent,
    NoteCardComponent,
  ],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent {
  private readonly service = inject(NoteService);
  private readonly translate = inject(TranslateService);
  protected lang = this.translate.getCurrentLang();
  protected readonly searchCtrl = new FormControl('');
  protected notes$!: Observable<Note[]>;

  constructor() {
    this.notes$ = this.searchCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap((q) => this.service.getAll(q!))
    );
  }

  protected trackById = (_: number, n: Note) => n.id;

  delete(id: string) {
    this.service.delete(id).subscribe(() => {
      this.searchCtrl.setValue(this.searchCtrl.value ?? '');
    });
  }

  clickDelete(id: string) {
    if (confirm(this.translate.instant('DELETE_CONFIRM'))) {
      this.delete(id);
    }
  }

  setLang(l: string) {
    this.lang = l;
    this.translate.use(l);
  }
}
