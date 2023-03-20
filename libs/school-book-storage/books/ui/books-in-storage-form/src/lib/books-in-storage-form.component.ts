import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Storage } from '@school-book-storage/storages/data-access';
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
import {
  BooksInStorage,
  BookStorage,
} from '@school-book-storage/shared-models';
import { BooksInStorageStore } from '@school-book-storage/shared/data-access';

@Component({
  selector: 'school-books-in-storage-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './books-in-storage-form.component.html',
  styleUrls: ['./books-in-storage-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksInStorageFormComponent implements OnInit {
  @Input() schoolId!: string;
  @Input() bookId!: string;
  @Input() availableStorages$!: Observable<Storage[]>;
  @Input() storage?: BookStorage;
  @Output() saved = new EventEmitter();
  @Output() cancel = new EventEmitter();

  booksInStorageForm!: FormGroup<{
    storageId: FormControl<string>;
    bookId: FormControl<string>;
    count: FormControl<number>;
  }>;

  constructor(
    private fb: FormBuilder,
    private booksInStorageStore: BooksInStorageStore
  ) {}

  ngOnInit(): void {
    this.booksInStorageForm = this.fb.nonNullable.group({
      storageId: [this.storage?.id ?? '', [Validators.required]],
      bookId: [this.bookId, [Validators.required]],
      count: [
        this.storage?.count ?? 0,
        [Validators.required, Validators.min(0)],
      ],
    });
  }

  get countCtrl() {
    return this.booksInStorageForm.get('count');
  }

  submit() {
    const booksInStorage = BooksInStorage.parse(this.booksInStorageForm.value);
    if (booksInStorage.count > 0) {
      this.booksInStorageStore.set({
        schoolId: this.schoolId,
        booksInStorage,
      });
    } else {
      this.booksInStorageStore.delete({
        schoolId: this.schoolId,
        booksInStorage,
      });
    }
    this.saved.emit();
  }

  increaseCount() {
    if (this.countCtrl) this.countCtrl.setValue(this.countCtrl.value + 1);
  }

  decreaseCount() {
    if (this.countCtrl && this.countCtrl.value > 0)
      this.countCtrl.setValue(this.countCtrl.value - 1);
  }
}
