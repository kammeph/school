import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Storage } from '@school-book-storage/storages/data-access';

@Component({
  selector: 'school-storage-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './storage-form.component.html',
  styleUrls: ['./storage-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StorageFormComponent implements OnInit {
  @Input() storage!: Storage;

  form!: FormGroup<{
    name: FormControl<string>;
    location: FormControl<string>;
  }>;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.nonNullable.group({
      name: [this.storage?.name ?? '', Validators.required],
      location: [this.storage?.location ?? '', Validators.required],
    });
  }
}
