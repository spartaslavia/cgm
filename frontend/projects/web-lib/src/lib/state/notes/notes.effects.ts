import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NoteService } from '../../services/note.service';
import { NotesActions } from './notes.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

export const loadNotesEffect = createEffect(
  (actions$ = inject(Actions), api = inject(NoteService)) =>
    actions$.pipe(
      ofType(NotesActions.load),
      mergeMap(({ query }) =>
        api.getAll(query).pipe(
          map((notes) => NotesActions.loadSuccess({ notes })),
          catchError((error) => of(NotesActions.loadFailure({ error })))
        )
      )
    ),
  { functional: true }
);

export const deleteNoteEffect = createEffect(
  (actions$ = inject(Actions), api = inject(NoteService)) =>
    actions$.pipe(
      ofType(NotesActions.delete),
      mergeMap(({ id }) =>
        api.delete(id).pipe(
          map(() => NotesActions.deleteSuccess({ id })),
          catchError((error) => of(NotesActions.deleteFailure({ id, error })))
        )
      )
    ),
  { functional: true }
);

export const loadOneEffect = createEffect(
  (actions$ = inject(Actions), api = inject(NoteService)) =>
    actions$.pipe(
      ofType(NotesActions.loadOne),
      mergeMap(({ id }) =>
        api.get(id).pipe(
          map((note) => NotesActions.loadOneSuccess({ note })),
          catchError((error) => of(NotesActions.loadOneFailure({ id, error })))
        )
      )
    ),
  { functional: true }
);

export const createNoteEffect = createEffect(
  (actions$ = inject(Actions), api = inject(NoteService)) =>
    actions$.pipe(
      ofType(NotesActions.create),
      mergeMap(({ dto }) =>
        api.create(dto).pipe(
          map((note) => NotesActions.createSuccess({ note })),
          catchError((error) => of(NotesActions.createFailure({ error })))
        )
      )
    ),
  { functional: true }
);

export const updateNoteEffect = createEffect(
  (actions$ = inject(Actions), api = inject(NoteService)) =>
    actions$.pipe(
      ofType(NotesActions.update),
      mergeMap(({ id, changes }) =>
        api.update(id, changes).pipe(
          map((note) => NotesActions.updateSuccess({ note })),
          catchError((error) => of(NotesActions.updateFailure({ id, error })))
        )
      )
    ),
  { functional: true }
);
