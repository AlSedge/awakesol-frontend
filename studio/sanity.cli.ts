import {defineCliConfig} from 'sanity/cli'

// Sanity CLI config for the awakesol Studio.
// studioHost sits at the ROOT of defineCliConfig (not under `deployment`) - with it
// here, `sanity deploy` skips the hostname prompt and updates awakesol-admin
// directly instead of offering to create another studio.
export default defineCliConfig({
  api: {
    projectId: 'hb5scemv',
    dataset: 'production',
  },
  studioHost: 'awakesol-admin',
  deployment: {
    autoUpdates: true,
  },
})