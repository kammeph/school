import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';
import {
  selectStorages,
  StorageStore,
} from '@school-book-storage/storages/data-access';
import {
  ActionSheetController,
  IonicModule,
  IonModal,
  NavController,
} from '@ionic/angular';
import { StorageFormComponent } from '@school-book-storage/storages/ui/form';
import { Store } from '@ngrx/store';
import { selectSchoolId } from '@school-book-storage/auth/data-access';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, map, startWith } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { selectBooksInStorages } from '@school-book-storage/inventory/data-access';

@Component({
  selector: 'school-storage-list',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    StorageFormComponent,
    TranslateModule,
  ],
  templateUrl: './storage-list.component.html',
  styleUrls: ['./storage-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StorageStore, TranslatePipe],
})
export class StorageListComponent {
  @ViewChild(IonModal) addStorageModal!: IonModal;
  @ViewChild(StorageFormComponent) addStorageForm!: StorageFormComponent;

  filterCtrl = new FormControl<string>('');
  schoolId$ = this.store.select(selectSchoolId);
  storages$ = combineLatest([
    this.store.select(selectStorages),
    this.filterCtrl.valueChanges.pipe(startWith('')),
  ]).pipe(
    map(([storages, filter]) =>
      storages.filter(
        (storage) =>
          storage.name.includes(filter?.toLowerCase() || '') ||
          storage.location.includes(filter?.toLowerCase() || '')
      )
    )
  );
  booksInStorages$ = this.store.select(selectBooksInStorages);

  constructor(
    private store: Store,
    private storageStore: StorageStore,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private translatePipe: TranslatePipe
  ) {}

  openAddStorageModal() {
    this.addStorageModal.present();
  }

  createStorage(schoolId: string) {
    const storage = this.addStorageForm.form.getRawValue();
    this.storageStore.create({ schoolId, storage });
    this.addStorageModal.dismiss();
  }

  cancel() {
    this.addStorageModal.dismiss();
  }

  navigateToStorageDetails(storageId?: string) {
    if (storageId)
      this.navCtrl.navigateForward([storageId], { relativeTo: this.route });
  }

  async openDeleteStorageSheet(schoolId: string, storageId?: string) {
    const sheet = await this.actionSheetCtrl.create({
      header: this.translatePipe.transform('deleteStorage'),
      buttons: [
        {
          text: this.translatePipe.transform('delete'),
          role: 'destructive',
          handler: () => this.deleteStorage(schoolId, storageId),
        },
        {
          text: this.translatePipe.transform('cancel'),
          role: 'cancel',
        },
      ],
    });
    sheet.present();
  }

  private deleteStorage(schoolId: string, storageId?: string) {
    if (storageId) this.storageStore.delete({ schoolId, storageId });
  }

  getBooksTotalCount(storageId?: string) {
    return this.booksInStorages$.pipe(
      map((booksInStorages) =>
        booksInStorages
          .filter((bookInStorage) => bookInStorage.storageId === storageId)
          .reduce((acc, bookInStorage) => acc + bookInStorage.count, 0)
      )
    );
  }
}
