import { Component, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { Observable } from 'rxjs';
import { Note } from '../../models/note';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { NotesHeaderComponent } from '../notes-header/notes-header.component';
import { NotesSearchComponent } from '../notes-search/notes-search.component';
import { NoteCardComponent } from '../note-card/note-card.component';
import { NotesActions, notesFeature } from '../../index';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private readonly store = inject(Store);
  private readonly translate = inject(TranslateService);
  private readonly destroyRef = inject(DestroyRef);
  protected lang = this.translate.getCurrentLang();
  protected readonly searchCtrl = new FormControl('');
  protected notes$!: Observable<Note[]>;

  ngOnInit() {
    this.notes$ = this.store.select(notesFeature.selectAll);

    this.store.dispatch(NotesActions.load({}));

    this.searchCtrl.valueChanges
      .pipe(startWith(''), debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((q) => this.store.dispatch(NotesActions.load({ query: q || undefined })));
  }

  protected trackById = (_: number, n: Note) => n.id;

  delete(id: string) {
    this.store.dispatch(NotesActions.delete({ id }));
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
