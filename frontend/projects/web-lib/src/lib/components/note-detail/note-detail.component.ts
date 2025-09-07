import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Note } from '../../models/note';
import { AutofocusDirective } from '../../directives/autofocus.directive';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { NotesActions, notesFeature } from '../../index';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'note-detail',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    AutofocusDirective,
    TranslateModule,
  ],
  template: `
    <form
      class="container-fluid py-3 d-flex flex-column gap-3"
      [formGroup]="form"
      (ngSubmit)="save()"
    >
      <mat-form-field appearance="outline">
        <mat-label>{{ 'TITLE' | translate }}</mat-label>
        <input matInput formControlName="title" required appAutofocus />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>{{ 'CONTENT' | translate }}</mat-label>
        <textarea matInput rows="5" formControlName="content"></textarea>
      </mat-form-field>
      <div class="d-flex gap-2">
        <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">
          {{ 'SAVE' | translate }}
        </button>
        <button mat-button type="button" routerLink="/notes">
          {{ 'CANCEL' | translate }}
        </button>
      </div>
    </form>
  `,
  styles: [],
})
export class NoteDetailComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  form = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.store.dispatch(NotesActions.loadOne({ id }));
      this.store
        .select(notesFeature.selectEntities)
        .pipe(takeUntilDestroyed())
        .subscribe((entities) => {
          const note = entities[id!];
          if (note) this.form.patchValue(note);
        });
    }
  }

  save(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const data = this.form.value as Partial<Note>;
    if (id && id !== 'new') {
      this.store.dispatch(NotesActions.update({ id, changes: data }));
    } else {
      this.store.dispatch(NotesActions.create({ dto: data }));
    }
    history.back();
  }
}
