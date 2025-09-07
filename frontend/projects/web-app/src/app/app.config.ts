import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { notesFeature } from '@cgm/web-lib';
import {
  loadNotesEffect,
  deleteNoteEffect,
  loadOneEffect,
  createNoteEffect,
  updateNoteEffect,
} from '@cgm/web-lib';

import { routes } from './app.routes';
import { errorHandlerInterceptor } from '../../../web-lib/src/lib/interceptors/error-handler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
      lang: 'en',
    }),
    provideStore({ [notesFeature.name]: notesFeature.reducer }),
    provideEffects({
      loadNotesEffect,
      deleteNoteEffect,
      loadOneEffect,
      createNoteEffect,
      updateNoteEffect,
    }),
  ],
};
