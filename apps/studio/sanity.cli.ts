import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'rwq1teez',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: true,
  },
})
