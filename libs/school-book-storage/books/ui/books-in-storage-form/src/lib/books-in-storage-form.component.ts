import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BooksInStorage,
  BookStorage,
} from '@school-book-storage/books/data-access';
import { Storage } from '@school-book-storage/storages/data-access';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'school-books-in-storage-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './books-in-storage-form.component.html',
  styleUrls: ['./books-in-storage-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksInStorageFormComponent implements OnInit {
  @Input() bookId!: string;
  @Input() availableStorages$!: Observable<Storage[]>;
  @Input() storage?: BookStorage;
  @Output() save = new EventEmitter<BooksInStorage>();
  @Output() cancel = new EventEmitter();

  bookCount!: FormControl<number>;
  storageId!: FormControl<string>;

  ngOnInit(): void {
    this.bookCount = new FormControl(this.storage?.count ?? 0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    });
    this.storageId = new FormControl(this.storage?.id ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    });
  }

  submit() {
    if (this.isValid())
      this.save.emit({
        storageId: this.storageId.value,
        bookId: this.bookId,
        count: this.bookCount.value,
      });
  }

  isValid() {
    return this.bookId && this.storageId.valid && this.bookCount.valid;
  }

  increaseCount() {
    this.bookCount.setValue(this.bookCount.value + 1);
  }

  decreaseCount() {
    if (this.bookCount.value > 0)
      this.bookCount.setValue(this.bookCount.value - 1);
  }
}
