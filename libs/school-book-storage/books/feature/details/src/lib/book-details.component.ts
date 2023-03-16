import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  selectGrades,
  selectSubjects,
} from '@school-book-storage/administration/data-access';
import { selectSchoolId } from '@school-book-storage/auth/data-access';
import { BookStore } from '@school-book-storage/books/data-access';
import { BookFormComponent } from '@school-book-storage/books/ui/book-form';
import { tap } from 'rxjs';

@Component({
  selector: 'school-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BookStore],
})
export class BookDetailsComponent {
  @ViewChild(BookFormComponent) bookForm!: BookFormComponent;

  schoolId$ = this.store.select(selectSchoolId).pipe(
    tap((schoolId) => {
      if (schoolId && this.bookId)
        this.bookStore.getById({ schoolId, bookId: this.bookId });
    })
  );
  book$ = this.bookStore.book$;
  subjects$ = this.store.select(selectSubjects);
  grades$ = this.store.select(selectGrades);
  private bookId = this.route.snapshot.params['id'] as string;

  constructor(
    private store: Store,
    private bookStore: BookStore,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  updateBook(schoolId: string) {
    this.bookStore.update({
      schoolId,
      bookId: this.bookId,
      book: this.bookForm.form.getRawValue(),
    });
    this.navCtrl.navigateBack('/app/books');
  }
}
