import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';
import { NotesActions } from './notes.actions';
import { Note } from '../../models/note';

export interface NotesState extends EntityState<Note> {
  loading: boolean;
  error: unknown | null;
}

const adapter = createEntityAdapter<Note>({ selectId: (n) => n.id });

const initialState: NotesState = adapter.getInitialState({ loading: false, error: null });

const reducer = createReducer(
  initialState,
  on(NotesActions.load, (state) => ({ ...state, loading: true, error: null })),
  on(NotesActions.loadSuccess, (state, { notes }) =>
    adapter.setAll(notes, { ...state, loading: false })
  ),
  on(NotesActions.loadFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(NotesActions.deleteSuccess, (state, { id }) => adapter.removeOne(id, state)),
  on(NotesActions.loadOneSuccess, (state, { note }) => adapter.upsertOne(note, state)),
  on(NotesActions.createSuccess, (state, { note }) => adapter.addOne(note, state)),
  on(NotesActions.updateSuccess, (state, { note }) => adapter.upsertOne(note, state))
);

export const notesFeature = createFeature({
  name: 'notes',
  reducer,
  extraSelectors: ({ selectNotesState }) => {
    const selectors = adapter.getSelectors(selectNotesState);
    return {
      ...selectors,
      selectLoading: (state: any) => selectNotesState(state).loading,
      selectError: (state: any) => selectNotesState(state).error,
    };
  },
});
