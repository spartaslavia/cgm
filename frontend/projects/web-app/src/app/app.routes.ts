import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'notes',
    loadComponent: () => import('@cgm/web-lib').then((m) => m.NotesListComponent),
  },
  {
    path: 'notes/:id',
    canActivate: [() => import('@cgm/web-lib').then((m) => m.noteExistsGuard)],
    loadComponent: () => import('@cgm/web-lib').then((m) => m.NoteDetailComponent),
  },
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: '**', redirectTo: 'notes' },
];
