import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'school-book-form',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookFormComponent {}
