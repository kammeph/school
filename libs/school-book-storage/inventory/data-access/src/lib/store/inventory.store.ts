import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, switchMap, tap } from 'rxjs';
import { InventoryService } from '../inventory-service';
import { Inventory } from '../models';

type InventoryState = {
  inventories: Inventory[];
  pending: boolean;
  error: string;
};

@Injectable()
export class InventoryStore extends ComponentStore<InventoryState> {
  constructor(private inventoryService: InventoryService) {
    super({ inventories: [], pending: false, error: '' });
  }

  readonly inventory$ = this.select((state) => state.inventories);
  readonly pending$ = this.select((state) => state.pending);
  readonly error$ = this.select((state) => state.error);

  readonly getAll = this.effect((schoolId$: Observable<string>) => {
    return schoolId$.pipe(
      tap(() => this.patchState({ pending: true })),
      switchMap((schoolId) =>
        this.inventoryService.getAll(schoolId).pipe(
          tapResponse(
            (inventories) => this.patchState({ inventories, pending: false }),
            (error: Error) =>
              this.patchState({ error: error.message, pending: false })
          )
        )
      )
    );
  });

  readonly create = this.effect(
    (triggers$: Observable<{ schoolId: string; inventory: Inventory }>) => {
      return triggers$.pipe(
        tap(() => this.patchState({ pending: true })),
        switchMap(({ schoolId, inventory }) =>
          this.inventoryService.create(schoolId, inventory).pipe(
            tapResponse(
              () => this.patchState({ pending: false, error: '' }),
              (error: Error) =>
                this.patchState({ error: error.message, pending: false })
            )
          )
        )
      );
    }
  );
}
