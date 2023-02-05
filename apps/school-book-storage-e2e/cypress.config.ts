import * as admin from 'firebase-admin';
import { nxE2EPreset } from '@nrwl/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';
import { plugin as cypressFirebasePlugin } from 'cypress-firebase';
import serviceAccount from '../../serviceAccount.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__dirname),
    // NOTE: Add "supportFile" setting if separate location is used
    setupNodeEvents(on, config) {
      //   // e2e testing node events setup code
      cypressFirebasePlugin(on, config, admin);
      //   // NOTE: If not setting GCLOUD_PROJECT env variable, project can be set like so:
      //   // return cypressFirebasePlugin(on, config, admin, { projectId: 'some-project' });
      // },
    },
  },
});
