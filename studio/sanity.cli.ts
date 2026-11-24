import {defineCliConfig} from 'sanity/cli';

export default defineCliConfig({
  api: {projectId: 'ep4aoi37', dataset: 'production'},
  // Hosted Studio address. Change before the first `pnpm deploy` if this name is taken.
  studioHost: 'delekhospital',
});
