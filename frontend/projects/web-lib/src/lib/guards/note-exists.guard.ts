import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { NoteService } from '../services/note.service';
import { map } from 'rxjs/operators';

export const noteExistsGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const service = inject(NoteService);
  const router = inject(Router);
  const id = route.paramMap.get('id');
  if (!id) return router.createUrlTree(['/notes']);
  return service.get(id).pipe(map((n) => (n ? true : router.createUrlTree(['/notes']))));
};

