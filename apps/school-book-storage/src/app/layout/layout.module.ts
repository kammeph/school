import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { IconsModule } from '../shared/icons/icons.module';
import { NavigationLinkComponent } from './navigation-link/navigation-link.component';
import { MaterialModule } from '../shared/material/material.module';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LayoutComponent, NavigationLinkComponent, UserMenuComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    IconsModule,
    MaterialModule,
    TranslateModule,
  ],
})
export class LayoutModule {}
