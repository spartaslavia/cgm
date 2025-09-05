import { Component, EventEmitter, Output, Input, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'notes-header',
  standalone: true,
  imports: [
    CommonModule,
    UpperCasePipe,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    TranslateModule,
  ],
  template: `
    <mat-toolbar color="primary" class="justify-content-between">
      <span>{{ 'NOTES' | translate }}</span>

      <span class="ms-auto d-flex align-items-center gap-2">
        <button mat-button [matMenuTriggerFor]="langMenu">{{ lang | uppercase }}</button>
        <mat-menu #langMenu="matMenu">
          <button mat-menu-item (click)="langChange.emit('en')">{{ 'LANG_EN' | translate }}</button>
          <button mat-menu-item (click)="langChange.emit('cs')">{{ 'LANG_CS' | translate }}</button>
        </mat-menu>
      </span>

      <button mat-icon-button [routerLink]="['/notes', 'new']" aria-label="Add">
        <mat-icon>add</mat-icon>
      </button>
    </mat-toolbar>
  `,
})
export class NotesHeaderComponent {
  @Input() lang = 'en';
  @Output() langChange = new EventEmitter<string>();
}
