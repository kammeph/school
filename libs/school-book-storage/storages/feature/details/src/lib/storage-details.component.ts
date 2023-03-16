import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageStore } from '@school-book-storage/storages/data-access';
import { IonicModule, NavController } from '@ionic/angular';
import { StorageFormComponent } from '@school-book-storage/storages/ui/form';
import { Store } from '@ngrx/store';
import { selectSchoolId } from '@school-book-storage/auth/data-access';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'school-storage-details',
  standalone: true,
  imports: [CommonModule, IonicModule, StorageFormComponent],
  templateUrl: './storage-details.component.html',
  styleUrls: ['./storage-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StorageStore],
})
export class StorageDetailsComponent {
  @ViewChild(StorageFormComponent) storageForm!: StorageFormComponent;

  schoolId$ = this.store.select(selectSchoolId).pipe(
    tap((schoolId) => {
      if (schoolId && this.storageId)
        this.storageStore.getById({ schoolId, storageId: this.storageId });
    })
  );
  storage$ = this.storageStore.storage$;
  private storageId = this.route.snapshot.params['id'] as string;

  constructor(
    private store: Store,
    private storageStore: StorageStore,
    private navCtrl: NavController,
    private route: ActivatedRoute
  ) {}

  updateStorage(schoolId: string) {
    this.storageStore.update({
      schoolId,
      storageId: this.storageId,
      storage: this.storageForm.form.getRawValue(),
    });
    this.navCtrl.navigateBack('/app/storages');
  }
}
