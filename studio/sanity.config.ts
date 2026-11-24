import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {schemaTypes, SCHEDULE_ID} from './schemaTypes';

const singletonTypes = new Set(['clinicSchedule']);

export default defineConfig({
  name: 'delekhospital',
  title: 'Delek Hospital',
  projectId: 'ep4aoi37',
  dataset: 'production',
  plugins: [structureTool({
    structure: S => S.list().title('Delek Hospital').items([
      S.listItem().title('Clinic schedule').id('clinic-schedule').child(
        S.document().schemaType('clinicSchedule').documentId(SCHEDULE_ID).title('Clinic schedule'),
      ),
      S.divider(),
      S.documentTypeListItem('news').title('Hospital news'),
      S.documentTypeListItem('story').title('Patient & community stories'),
    ]),
  })],
  schema: {
    types: schemaTypes,
    // The schedule is a single fixed document: no "create new schedule" option.
    templates: templates => templates.filter(template => !singletonTypes.has(template.schemaType)),
  },
  document: {
    actions: (actions, context) => singletonTypes.has(context.schemaType)
      ? actions.filter(action => !['delete', 'duplicate', 'unpublish'].includes(action.action || ''))
      : actions,
    newDocumentOptions: options => options.filter(option => !singletonTypes.has(option.templateId)),
  },
});
