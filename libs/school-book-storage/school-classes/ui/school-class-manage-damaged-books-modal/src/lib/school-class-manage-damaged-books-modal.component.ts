import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonModal } from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import {
  Book,
  BooksInSchoolClass,
  Countable,
  DamagedBook,
  SchoolClass,
} from '@school-book-storage/shared-models';
import { CountableSelectModalComponent } from '@school-book-storage/shared/ui/countable-select-modal';
import { Store } from '@ngrx/store';
import {
  selectBookCountInSchoolClass,
  selectUndamagedBooksBySchoolClassId,
} from '@school-book-storage/inventory/data-access';
import { filter, map, Observable, startWith, switchMap, tap } from 'rxjs';
import { BooksUiBooksInSchoolClassFormComponent } from '@school-book-storage/books/ui/books-in-school-class-form';

@Component({
  selector: 'school-school-class-manage-damaged-books-modal',
  standalone: true,
  imports: [
    CommonModule,
    CountableSelectModalComponent,
    BooksUiBooksInSchoolClassFormComponent,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './school-class-manage-damaged-books-modal.component.html',
  styleUrls: ['./school-class-manage-damaged-books-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolClassManageDamagedBooksModalComponent implements OnInit {
  @ViewChild('selectBookModal') selectBookModal!: IonModal;

  @Input() book?: Countable;
  @Input() books!: Book[] | null;
  @Input() schoolClassId!: string;
  @Input() schoolClass?: SchoolClass | null;
  @Output() save = new EventEmitter<{
    booksInSchoolClass: BooksInSchoolClass;
    damagedBook: DamagedBook;
  }>();
  @Output() cancel = new EventEmitter();

  form!: FormGroup<{
    bookId: FormControl<string>;
    bookName: FormControl<string>;
    count: FormControl<number>;
    undamagedCount: FormControl<number>;
  }>;

  bookCountInSchoolClass$?: Observable<number>;
  availableBooks$!: Observable<Countable[]>;

  private maxCount = 0;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      bookId: [this.book?.id || '', Validators.required],
      bookName: [this.book?.name || ''],
      count: [this.book?.count || 0, [Validators.required, Validators.min(0)]],
      undamagedCount: [0],
    });

    this.bookCountInSchoolClass$ = this.form.get('bookId')?.valueChanges.pipe(
      startWith(this.book?.id || ''),
      filter((bookId) => !!bookId),
      switchMap((bookId) =>
        this.store.select(
          selectBookCountInSchoolClass(bookId, this.schoolClassId)
        )
      ),
      tap((count) => {
        this.form.get('undamagedCount')?.setValue(count);
        this.form.get('count')?.removeValidators(Validators.max(this.maxCount));
        this.form.get('count')?.addValidators(Validators.max(count));
        this.maxCount = count;
      })
    );

    this.availableBooks$ = this.store
      .select(selectUndamagedBooksBySchoolClassId(this.schoolClassId))
      .pipe(
        map((undamagedBooks) =>
          undamagedBooks.map((undamagedBook) => {
            return {
              id: undamagedBook.bookId,
              name:
                this.books?.find((book) => book.id === undamagedBook.bookId)
                  ?.name || '',
              count: undamagedBook.count,
            };
          })
        )
      );

    this.maxCount = this.book?.count ?? 0;
  }

  get countCtrl() {
    return this.form.get('count');
  }

  increaseCount() {
    if (this.countCtrl && this.countCtrl.value < this.maxCount)
      this.countCtrl.setValue(this.countCtrl.value + 1);
  }

  decreaseCount() {
    if (this.countCtrl && this.countCtrl.value > 0)
      this.countCtrl.setValue(this.countCtrl.value - 1);
  }

  submit() {
    const { bookId, count, undamagedCount } = this.form.value;
    if (
      !bookId ||
      count === undefined ||
      !this.schoolClassId ||
      undamagedCount === undefined
    )
      return;
    const damagedBooks = {
      bookId,
      schoolClassId: this.schoolClassId,
      count,
    };
    const booksInSchoolClass = {
      bookId,
      schoolClassId: this.schoolClassId,
      count: undamagedCount - (count - (this.book?.count || 0)),
    };
    this.save.emit({ booksInSchoolClass, damagedBook: damagedBooks });
  }

  bookSelected(book: Countable) {
    this.form.patchValue({
      bookId: book.id,
      bookName: book.name,
      count: 0,
      undamagedCount: book.count,
    });
    this.selectBookModal.dismiss();
  }

  openSelectBookModal() {
    if (this.book?.id) return;
    this.selectBookModal.present();
  }
}
