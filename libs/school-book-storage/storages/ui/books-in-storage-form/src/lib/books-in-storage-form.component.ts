import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Book, StorageBook } from '@school-book-storage/shared-models';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'school-storages-books-in-storage-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './books-in-storage-form.component.html',
  styleUrls: ['./books-in-storage-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksInStorageFormComponent implements OnInit {
  @Input() storageId!: string;
  @Input() storageName!: string;
  @Input() availableBooks$!: Observable<Book[]>;
  @Input() book?: StorageBook;
  @Output() saved = new EventEmitter();
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
      storageId: [this.storageId ?? '', [Validators.required]],
      bookId: [this.book?.id ?? '', [Validators.required]],
      count: [this.book?.count ?? 0, [Validators.required, Validators.min(0)]],
      comment: [''],
    });
  }

  get countCtrl() {
    return this.booksInStorageForm.get('count');
  }

  submit() {
    const { storageId, bookId, count, comment } = this.booksInStorageForm.value;
    if (!storageId || !bookId || count === undefined) return;
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
