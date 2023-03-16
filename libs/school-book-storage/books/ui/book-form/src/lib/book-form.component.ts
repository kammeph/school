import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Book, Subject } from '@school-book-storage/books/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'school-book-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookFormComponent implements OnInit {
  @Input() book!: Book;
  @Input() subjects$!: Observable<Subject[]>;
  @Input() grades$!: Observable<number[]>;

  form!: FormGroup<{
    isbn: FormControl<string>;
    name: FormControl<string>;
    description: FormControl<string | undefined>;
    subject: FormControl<Subject | undefined>;
    grades: FormControl<number[]>;
  }>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      isbn: [this.book?.isbn ?? '', Validators.required],
      name: [this.book?.name ?? '', Validators.required],
      description: [this.book?.description],
      subject: [this.book?.subject],
      grades: [this.book?.grades ?? []],
    });
  }
}
