import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, IonModal, NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslatePipe } from '@ngx-translate/core';
import {
  selectGrades,
  selectSubjects,
} from '@school-book-storage/administration/data-access';
import { selectSchoolId } from '@school-book-storage/auth/data-access';
import { BookStore } from '@school-book-storage/books/data-access';
import { BookFormComponent } from '@school-book-storage/books/ui/book-form';
import { tap } from 'rxjs';

@Component({
  selector: 'school-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BookStore, TranslatePipe],
})
export class BookListComponent {
  @ViewChild(IonModal) addBookModal!: IonModal;
  @ViewChild(BookFormComponent) addbookForm!: BookFormComponent;

  schoolId$ = this.store
    .select(selectSchoolId)
    .pipe(tap((schoolId) => this.bookStore.getAll(schoolId)));
  books$ = this.bookStore.books$;
  subjects$ = this.store.select(selectSubjects);
  grades$ = this.store.select(selectGrades);
  filterCtrl = new FormControl('');

  constructor(
    private store: Store,
    private bookStore: BookStore,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private translatePipe: TranslatePipe
  ) {}

  openAddBookModal() {
    this.addBookModal.present();
  }

  createBook(schoolId: string) {
    const book = this.addbookForm.form.getRawValue();
    this.bookStore.create({ schoolId, book });
    this.addBookModal.dismiss();
  }

  cancel() {
    this.addBookModal.dismiss();
  }

  navigateToBookDetails(bookId?: string) {
    if (bookId)
      this.navCtrl.navigateForward([bookId], { relativeTo: this.route });
  }

  async openDeleteBookSheet(schoolId: string, bookId?: string) {
    const sheet = await this.actionSheetCtrl.create({
      header: this.translatePipe.transform('deleteBook'),
      buttons: [
        {
          text: this.translatePipe.transform('yes'),
          role: 'destructive',
          handler: () => this.deleteBook(schoolId, bookId),
        },
        {
          text: this.translatePipe.transform('no'),
          role: 'cancel',
        },
      ],
    });

    sheet.present();
  }

  private deleteBook(schoolId: string, bookId?: string) {
    if (bookId) this.bookStore.delete({ schoolId, bookId });
  }
}
