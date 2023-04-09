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
import { IonModal, IonicModule } from '@ionic/angular';
import {
  Book,
  BooksInSchoolClass,
  BooksInStorage,
  SchoolClass,
  Storage,
} from '@school-book-storage/shared-models';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CountableSelectModalComponent } from '@school-book-storage/shared/ui/countable-select-modal';
import { Store } from '@ngrx/store';
import { selectStorages } from '@school-book-storage/storages/data-access';
import {
  selectBooksInSchoolClassesBySchoolClassId,
  selectBooksInStoragesByStorageId,
} from '@school-book-storage/inventory/data-access';
import { take, tap, withLatestFrom } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'school-school-class-multi-book-assignment',
  standalone: true,
  imports: [
    CommonModule,
    CountableSelectModalComponent,
    IonicModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './school-class-multi-book-assignment.component.html',
  styleUrls: ['./school-class-multi-book-assignment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolClassMultiBookAssignmentComponent implements OnInit {
  @ViewChild('selectStorageModal') selectStorageModal!: IonModal;
  @Input()
  schoolClassId!: string;
  @Input() schoolClass?: SchoolClass | null;
  @Input() books!: Book[] | null;
  @Output() save = new EventEmitter<{
    booksInStorage: BooksInStorage[];
    booksInSchoolClass: BooksInSchoolClass[];
  }>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup<{
    storageId: FormControl<string>;
    storageName: FormControl<string>;
    schoolClassId: FormControl<string>;
    books: FormArray<
      FormGroup<{
        bookId: FormControl<string>;
        bookName: FormControl<string>;
        schoolClassCount: FormControl<number>;
        storageCount: FormControl<number>;
      }>
    >;
  }>;

  storages$ = this.store.select(selectStorages);

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit() {
    this.form = this.fb.nonNullable.group({
      storageId: [''],
      storageName: [''],
      schoolClassId: [this.schoolClassId],
      books: this.fb.nonNullable.array<
        FormGroup<{
          bookId: FormControl<string>;
          bookName: FormControl<string>;
          schoolClassCount: FormControl<number>;
          storageCount: FormControl<number>;
        }>
      >([]),
    });
  }

  private bookCountValidator = (g: AbstractControl) => {
    return !this.schoolClass?.pupilsCount ||
      !g.value?.storageCount ||
      g.value.storageCount >= this.schoolClass.pupilsCount
      ? null
      : { notEnoughBooksInStorage: true };
  };

  submit() {
    const booksInStorage: BooksInStorage[] = [];
    const booksInSchoolClass: BooksInSchoolClass[] = [];

    this.form.controls.books.controls.forEach((book) => {
      const bookId = book.controls.bookId.value;
      const schoolClassCount = book.controls.schoolClassCount.value;
      const storageCount = book.controls.storageCount.value;
      const storageId = this.form.controls.storageId.value;
      const schoolClassId = this.form.controls.schoolClassId.value;

      booksInStorage.push({
        bookId,
        storageId,
        count: storageCount - schoolClassCount,
      });
      booksInSchoolClass.push({
        bookId,
        schoolClassId,
        count: schoolClassCount,
      });
    });

    this.save.emit({ booksInStorage, booksInSchoolClass });
  }

  selectStorage(storage: Storage) {
    if (!storage.id || !this.schoolClassId) return;
    this.form.controls.books.clear();
    this.form.patchValue({ storageId: storage.id, storageName: storage.name });
    this.store
      .select(selectBooksInStoragesByStorageId(storage.id))
      .pipe(
        withLatestFrom(
          this.store.select(
            selectBooksInSchoolClassesBySchoolClassId(this.schoolClassId)
          )
        ),
        tap(([booksInStorage, booksInSchoolClass]) => {
          booksInStorage.forEach((bookInStorage) => {
            const book = this.books?.find((b) => b.id === bookInStorage.bookId);
            if (
              !book ||
              !this.schoolClass ||
              !book?.grades?.includes(this.schoolClass?.grade) ||
              !booksInSchoolClass.every((b) => b.bookId !== book?.id)
            )
              return;
            const formGroup = this.fb.nonNullable.group(
              {
                bookId: [bookInStorage.bookId],
                bookName: [book.name],
                schoolClassCount: [
                  bookInStorage.count >= this.schoolClass.pupilsCount
                    ? this.schoolClass?.pupilsCount
                    : bookInStorage.count,
                ],
                storageCount: [bookInStorage.count],
              },
              { validators: this.bookCountValidator }
            );
            this.form.controls.books.push(formGroup);
          });
        }),
        take(1)
      )
      .subscribe();
    this.selectStorageModal.dismiss();
  }

  removeBook(index: number) {
    this.form.controls.books.removeAt(index);
  }
}
