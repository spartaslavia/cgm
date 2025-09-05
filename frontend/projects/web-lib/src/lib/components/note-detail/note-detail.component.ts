import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NoteService } from '../../services/note.service';
import { Note } from '../../models/note';
import { AutofocusDirective } from '../../directives/autofocus.directive';
import { TranslateModule } from '@ngx-translate/core';

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
  templateUrl: './note-detail.component.html',
  styles: [],
})
export class NoteDetailComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(NoteService);
  form = this.fb.group({
    title: ['', Validators.required],
    content: ['', Validators.required],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id !== 'new') {
      this.service.get(id).subscribe((n) => this.form.patchValue(n));
    }
  }

  save(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const raw = this.form.value;
    const data: Partial<Note> = {
      title: raw.title ?? undefined,
      content: raw.content ?? undefined,
    };
    const obs = id && id !== 'new' ? this.service.update(id, data) : this.service.create(data);
    obs.subscribe(() => history.back());
  }
}
