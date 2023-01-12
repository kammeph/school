import { NgModule } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faBook,
  faBookOpen,
  faCancel,
  faCheck,
  faGraduationCap,
  faKey,
  faMinus,
  faPen,
  faPlus,
  faPowerOff,
  faSave,
  faSchool,
  faTrash,
  faUser,
  faUsers,
  faWarehouse,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [],
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faSave,
      faCancel,
      faTrash,
      faBook,
      faCheck,
      faMinus,
      faPlus,
      faUser,
      faUsers,
      faPen,
      faKey,
      faPowerOff,
      faSchool,
      faBookOpen,
      faWarehouse,
      faGraduationCap
    );
  }
}
