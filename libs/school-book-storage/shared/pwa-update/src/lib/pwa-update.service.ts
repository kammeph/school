import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AlertController } from '@ionic/angular';
import { TranslatePipe } from '@ngx-translate/core';

@Injectable()
export class PwaUpdateService {
  constructor(
    updates: SwUpdate,
    private alertCtrl: AlertController,
    private translatePipe: TranslatePipe
  ) {
    updates.versionUpdates.subscribe((evt) => {
      switch (evt.type) {
        case 'VERSION_DETECTED':
          console.log(`Downloading new app version: ${evt.version.hash}`);
          break;
        case 'VERSION_READY':
          console.log(`Current app version: ${evt.currentVersion.hash}`);
          console.log(
            `New app version ready for use: ${evt.latestVersion.hash}`
          );
          this.update().then();
          break;
        case 'VERSION_INSTALLATION_FAILED':
          console.log(
            `Failed to install app version '${evt.version.hash}': ${evt.error}`
          );
          break;
      }
    });
  }

  async update() {
    const alert = await this.alertCtrl.create({
      header: this.translatePipe.transform('updateAvailable'),
      message: this.translatePipe.transform('updateWillBeInstalled'),
      buttons: [{ text: 'OK', handler: () => document.location.reload() }],
    });
    await alert.present();
  }
}
