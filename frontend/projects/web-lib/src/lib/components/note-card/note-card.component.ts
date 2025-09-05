import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../../models/note';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { RelativeDatePipe } from '../../pipes/relative-date.pipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'note-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule,
    RelativeDatePipe,
  ],
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent {
  @Input() note!: Note;
  @Output() delete = new EventEmitter<string>();
  onDelete(ev: Event) {
    ev.stopPropagation();
    ev.preventDefault();
    this.delete.emit(this.note.id);
  }
}
