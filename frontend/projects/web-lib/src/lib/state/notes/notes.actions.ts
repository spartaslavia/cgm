import { createActionGroup, props } from '@ngrx/store';
import { Note } from '../../models/note';

export const NotesActions = createActionGroup({
  source: 'Notes',
  events: {
    Load: props<{ query?: string }>(),
    'Load Success': props<{ notes: Note[] }>(),
    'Load Failure': props<{ error: unknown }>(),

    'Load One': props<{ id: string }>(),
    'Load One Success': props<{ note: Note }>(),
    'Load One Failure': props<{ id: string; error: unknown }>(),

    Create: props<{ dto: Partial<Note> }>(),
    'Create Success': props<{ note: Note }>(),
    'Create Failure': props<{ error: unknown }>(),

    Update: props<{ id: string; changes: Partial<Note> }>(),
    'Update Success': props<{ note: Note }>(),
    'Update Failure': props<{ id: string; error: unknown }>(),

    Delete: props<{ id: string }>(),
    'Delete Success': props<{ id: string }>(),
    'Delete Failure': props<{ id: string; error: unknown }>(),
  },
});
