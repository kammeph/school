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
import {
  BookSchoolClass,
  BookStorage,
  SchoolClass,
} from '@school-book-storage/shared-models';
import { combineLatest, map, Observable, startWith, Subscription } from 'rxjs';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  BooksInSchoolClassStore,
  BooksInStorageStore,
} from '@school-book-storage/shared/data-access';
import { IonicModule, IonModal } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'school-books-ui-books-in-school-class-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './books-in-school-class-form.component.html',
  styleUrls: ['./books-in-school-class-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksUiBooksInSchoolClassFormComponent
  implements OnInit, OnDestroy
{
  @ViewChild('storageSelectModal') storageSelectModal!: IonModal;
  @ViewChild('schoolClassSelectModal') schoolClassSelectModal!: IonModal;

  @Input() schoolId!: string;
  @Input() bookId!: string;
  @Input() bookName!: string;
  @Input() availableStorages!: BookStorage[] | undefined;
  @Input() availableSchoolClasses$!: Observable<SchoolClass[]>;
  @Input() schoolClass?: BookSchoolClass;
  @Output() saved = new EventEmitter();
  @Output() cancel = new EventEmitter();

  booksInSchoolClassForm!: FormGroup<{
    bookId: FormControl<string>;
    schoolClassId: FormControl<string>;
    schoolClassName: FormControl<string>;
    storageId: FormControl<string>;
    storageName: FormControl<string>;
    booksInSchoolClassCount: FormControl<number>;
    booksInStorageCount: FormControl<number>;
    count: FormControl<number>;
  }>;

  canChangeCount$!: Observable<boolean>;
  private subscription = new Subscription();
  private maxCount = 0;

  constructor(
    private fb: FormBuilder,
    private booksInSchoolClassStore: BooksInSchoolClassStore,
    private booksInStorageStore: BooksInStorageStore
  ) {}

  ngOnInit(): void {
    this.booksInSchoolClassForm = this.fb.nonNullable.group({
      bookId: [this.bookId, [Validators.required]],
      schoolClassId: [this.schoolClass?.id ?? '', [Validators.required]],
      schoolClassName: [this.schoolClass?.name ?? ''],
      storageId: ['', [Validators.required]],
      storageName: [''],
      booksInSchoolClassCount: [0, [Validators.required, Validators.min(0)]],
      booksInStorageCount: [
        this.schoolClass?.count ?? 0,
        [Validators.required, Validators.min(0)],
      ],
      count: [
        this.schoolClass?.count ?? 0,
        [Validators.required, Validators.min(0)],
      ],
    });

    const schoolClassIdCtrl = this.booksInSchoolClassForm.get('schoolClassId');
    const storageIdCtrl = this.booksInSchoolClassForm.get('storageId');

    if (schoolClassIdCtrl && storageIdCtrl) {
      this.canChangeCount$ = combineLatest([
        storageIdCtrl.valueChanges.pipe(startWith('')),
        schoolClassIdCtrl.valueChanges.pipe(
          startWith(this.schoolClass?.id ?? '')
        ),
      ]).pipe(
        map(([storageId, schoolClassId]) => !!storageId && !!schoolClassId)
      );
    }

    this.subscription.add(
      this.booksInSchoolClassForm
        .get('storageId')
        ?.valueChanges.subscribe((storageId) => {
          const count =
            this.availableStorages?.find((s) => s.id === storageId)?.count ?? 0;
          this.maxCount = count + (this.schoolClass?.count ?? 0);
          this.booksInSchoolClassForm.patchValue({
            booksInStorageCount: count,
          });
        })
    );

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

  submit() {
    if (this.booksInSchoolClassForm.valid) {
      const {
        bookId,
        schoolClassId,
        storageId,
        booksInStorageCount,
        booksInSchoolClassCount,
      } = this.booksInSchoolClassForm.getRawValue();
      this.booksInSchoolClassStore.set({
        schoolId: this.schoolId,
        booksInSchoolClass: {
          bookId,
          schoolClassId,
          count: booksInSchoolClassCount,
        },
      });
      this.booksInStorageStore.set({
        schoolId: this.schoolId,
        booksInStorage: { bookId, storageId, count: booksInStorageCount },
      });
      this.saved.emit();
    }
  }

  increaseCount() {
    if (this.countCtrl && this.countCtrl.value < this.maxCount)
      this.countCtrl.setValue(this.countCtrl.value + 1);
  }

  decreaseCount() {
    if (this.countCtrl && this.countCtrl.value > 0)
      this.countCtrl.setValue(this.countCtrl.value - 1);
  }

  openStorageSelectModal() {
    this.storageSelectModal.present();
  }

  selectStorage(storage: BookStorage) {
    console.log(storage);
    this.booksInSchoolClassForm.patchValue({
      storageId: storage.id,
      storageName: storage.name,
      booksInStorageCount: storage.count,
      booksInSchoolClassCount: this.schoolClass?.count ?? 0,
      count: this.schoolClass?.count ?? 0,
    });
    this.storageSelectModal.dismiss();
  }

  openSchoolClassSelectModal() {
    this.schoolClassSelectModal.present();
  }

  selectSchoolClass(schoolClass: SchoolClass) {
    const booksInStorageCount =
      this.availableStorages?.find(
        (s) => s.id === this.booksInSchoolClassForm.get('storageId')?.value
      )?.count ?? 0;
    this.booksInSchoolClassForm.patchValue({
      schoolClassId: schoolClass.id,
      schoolClassName: `${schoolClass.grade}${schoolClass.letter}`,
      booksInStorageCount,
      booksInSchoolClassCount: this.schoolClass?.count ?? 0,
      count: this.schoolClass?.count ?? 0,
    });
    this.schoolClassSelectModal.dismiss();
  }
}
