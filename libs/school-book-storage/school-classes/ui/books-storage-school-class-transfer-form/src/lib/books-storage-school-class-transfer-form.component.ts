import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
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
import {
  combineLatest,
  map,
  Observable,
  of,
  startWith,
  Subscription,
  withLatestFrom,
} from 'rxjs';
import {
  SchoolClass,
  BooksInStorage,
  BooksInSchoolClass,
  SchoolClassBook,
  BookStorage,
} from '@school-book-storage/shared-models';
import { Store } from '@ngrx/store';
import { selectBooksInStoragesByBookId } from '@school-book-storage/inventory/data-access';
import { selectStorages } from '@school-book-storage/storages/data-access';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'school-books-storage-school-class-transfer-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './books-storage-school-class-transfer-form.component.html',
  styleUrls: ['./books-storage-school-class-transfer-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksStorageSchoolClassTransferFormComponent
  implements OnInit, OnDestroy
{
  @ViewChild('storageSelectModal') storageSelectModal!: IonModal;
  @ViewChild('bookSelectModal') bookSelectModal!: IonModal;

  @Input() schoolClassId!: string;
  @Input() schoolClass!: SchoolClass;
  @Input() availableStorages$!: Observable<BookStorage[]> | null;
  @Input() availableBooks!: SchoolClassBook[] | undefined | null;
  @Input() book?: SchoolClassBook;
  @Output() save = new EventEmitter<{
    booksInStorage: BooksInStorage;
    booksInSchoolClass: BooksInSchoolClass;
  }>();
  @Output() cancel = new EventEmitter();

  canChangeCount$!: Observable<boolean>;
  storagesForBook$!: Observable<BookStorage[]>;

  storages$!: Observable<BookStorage[]>;

  booksInSchoolClassForm!: FormGroup<{
    bookId: FormControl<string>;
    bookName: FormControl<string>;
    schoolClassId: FormControl<string>;
    schoolClassName: FormControl<string>;
    storageId: FormControl<string>;
    storageName: FormControl<string>;
    booksInStorageCount: FormControl<number>;
    booksInSchoolClassCount: FormControl<number>;
    count: FormControl<number>;
  }>;

  private subscription = new Subscription();
  private maxCount = 0;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.booksInSchoolClassForm = this.fb.nonNullable.group({
      bookId: [this.book?.id ?? '', [Validators.required]],
      bookName: [this.book?.name ?? ''],
      schoolClassId: [this.schoolClassId, [Validators.required]],
      schoolClassName: [
        this.schoolClass
          ? `${this.schoolClass.grade}${this.schoolClass.letter}`
          : '',
      ],
      storageId: ['', [Validators.required]],
      storageName: [''],
      booksInStorageCount: [0, [Validators.required, Validators.min(0)]],
      booksInSchoolClassCount: [
        this.book?.count ?? 0,
        [Validators.required, Validators.min(0)],
      ],
      count: [this.book?.count ?? 0, [Validators.required, Validators.min(0)]],
    });

    const bookIdCtrl = this.booksInSchoolClassForm.get('bookId');
    const storageIdCtrl = this.booksInSchoolClassForm.get('storageId');

    if (bookIdCtrl && storageIdCtrl) {
      this.canChangeCount$ = combineLatest([
        storageIdCtrl.valueChanges.pipe(startWith('')),
        bookIdCtrl.valueChanges.pipe(startWith(this.book?.id ?? '')),
      ]).pipe(map(([storageId, bookId]) => !!storageId && !!bookId));
    }

    this.subscription.add(
      this.booksInSchoolClassForm
        .get('count')
        ?.valueChanges.subscribe((count) => {
          const currentInSchoolClassCount =
            this.booksInSchoolClassForm.get('booksInSchoolClassCount')?.value ??
            0;
          const currentInStorageCount =
            this.booksInSchoolClassForm.get('booksInStorageCount')?.value ?? 0;

          const booksInStorageCount =
            currentInStorageCount + currentInSchoolClassCount - count;
          const booksInSchoolClassCount = count;
          this.booksInSchoolClassForm.patchValue({
            booksInStorageCount,
            booksInSchoolClassCount,
          });
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get countCtrl() {
    return this.booksInSchoolClassForm.get('count');
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
    const {
      bookId,
      storageId,
      booksInStorageCount,
      schoolClassId,
      booksInSchoolClassCount,
    } = this.booksInSchoolClassForm.value;
    if (
      !bookId ||
      !storageId ||
      !schoolClassId ||
      booksInStorageCount === undefined ||
      booksInSchoolClassCount === undefined
    )
      return;
    this.save.emit({
      booksInStorage: {
        bookId,
        storageId,
        count: booksInStorageCount,
      },
      booksInSchoolClass: {
        bookId,
        schoolClassId,
        count: booksInSchoolClassCount,
      },
    });
  }

  openStorageSelectModal() {
    this.storageSelectModal.present();
  }

  selectStorage(storage: BookStorage) {
    this.maxCount =
      storage.count +
      (this.booksInSchoolClassForm.value.booksInSchoolClassCount ?? 0);
    this.booksInSchoolClassForm.patchValue({
      storageId: storage.id,
      storageName: storage.name,
      booksInStorageCount: storage.count,
      booksInSchoolClassCount: this.book?.count ?? 0,
      count: this.book?.count ?? 0,
    });
    this.storageSelectModal.dismiss();
  }

  openBookSelectModal() {
    if (this.book) return;
    this.bookSelectModal.present();
  }

  selectBook(book: SchoolClassBook) {
    this.booksInSchoolClassForm.patchValue({
      bookId: book.id,
      bookName: book.name,
      booksInSchoolClassCount: book.count ?? 0,
      count: book.count ?? 0,
      storageId: '',
      storageName: '',
      booksInStorageCount: 0,
    });
    this.bookSelectModal.dismiss();
  }

  getStoragesForBook(bookId?: string) {
    if (!bookId) return of([]);
    return this.store.select(selectBooksInStoragesByBookId(bookId)).pipe(
      withLatestFrom(this.store.select(selectStorages)),
      map(([booksInStorages, storages]) => {
        return storages?.reduce((acc, storage) => {
          if (storage.id) {
            const booksInStorage = booksInStorages.find(
              (b) => b.storageId === storage.id
            );
            acc.push({
              id: storage.id,
              name: storage.name,
              count: booksInStorage?.count ?? 0,
            });
          }
          return acc;
        }, [] as BookStorage[]);
      })
    );
  }
}
