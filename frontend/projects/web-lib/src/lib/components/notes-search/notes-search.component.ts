import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { debounceTime, startWith } from 'rxjs/operators';

@Component({
  selector: 'notes-search',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './notes-search.component.html',
  styleUrls: [],
})
export class NotesSearchComponent {
  @Output() searchChange = new EventEmitter<string>();
  @Input() debounce = 300;

  ctrl = new FormControl('');

  ngOnInit() {
    this.ctrl.valueChanges
      .pipe(startWith(''), debounceTime(this.debounce))
      .subscribe((v) => this.searchChange.emit(v ?? ''));
  }
}
