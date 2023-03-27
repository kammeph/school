import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Book, BookStorage, Storage } from '@school-book-storage/shared-models';

@Component({
  selector: 'school-books-books-in-storage-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './books-in-storage-form.component.html',
  styleUrls: ['./books-in-storage-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksInStorageFormComponent implements OnInit {
  @Input() bookId!: string;
  @Input() book!: Book;
  @Input() availableStorages$!: Observable<Storage[]>;
  @Input() storage?: BookStorage;
  @Output() saved = new EventEmitter<{
    storageId: string;
    bookId: string;
    count: number;
    comment?: string;
  }>();
  @Output() cancel = new EventEmitter();

  booksInStorageForm!: FormGroup<{
    storageId: FormControl<string>;
    bookId: FormControl<string>;
    count: FormControl<number>;
    comment: FormControl<string>;
  }>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.booksInStorageForm = this.fb.nonNullable.group({
      storageId: [this.storage?.id ?? '', [Validators.required]],
      bookId: [this.bookId, [Validators.required]],
      count: [
        this.storage?.count ?? 0,
        [Validators.required, Validators.min(0)],
      ],
      comment: [''],
    });
  }

  get countCtrl() {
    return this.booksInStorageForm.get('count');
  }

  submit() {
    const { bookId, storageId, count, comment } = this.booksInStorageForm.value;
    if (!bookId || !storageId || count === undefined) return;
    this.saved.emit({ bookId, storageId, count, comment });
  }

  increaseCount() {
    if (this.countCtrl) this.countCtrl.setValue(this.countCtrl.value + 1);
  }

  decreaseCount() {
    if (this.countCtrl && this.countCtrl.value > 0)
      this.countCtrl.setValue(this.countCtrl.value - 1);
  }
}
