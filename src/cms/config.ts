export function cmsConfig(authUrl?: string) {
  const common = [
    { name: 'title', label: 'Title', widget: 'string' },
    { name: 'draft', label: 'Keep off the public website', widget: 'boolean', default: true, hint: 'Switch off only after hospital approval. Publishing also requires the Git review workflow.' },
  ];
  return {
    backend: authUrl
      ? { name: 'github', repo: 'sllvers/delekhospital', branch: 'main', base_url: authUrl, auth_endpoint: 'auth' }
      : { name: 'test-repo' },
    load_config_file: false,
    publish_mode: 'editorial_workflow',
    site_url: 'https://delekhospital.org',
    display_url: 'https://delekhospital.org',
    media_folder: 'public/uploads',
    public_folder: '/uploads',
    slug: { encoding: 'ascii', clean_accents: true, sanitize_replacement: '-' },
    collections: [
      {
        name: 'care', label: 'Clinic schedules', preview_path: 'find-care/schedules/', editor: { preview: false },
        files: [{
          name: 'schedule', label: 'Clinic hours and Saturdays', file: 'src/data/schedule.json', format: 'json',
          fields: [
            { name: 'reviewedOn', label: 'Last confirmed by the hospital', widget: 'datetime', required: false, default: '', format: 'YYYY-MM-DD', date_format: 'YYYY-MM-DD', time_format: false, hint: 'Only enter a date after the hospital confirms this schedule.' },
            {
              name: 'clinics', label: 'Clinics', widget: 'list', collapsed: true,
              summary: '{{fields.name}}', allow_add: false, allow_remove: false, allow_reorder: false,
              fields: [
                { name: 'id', widget: 'hidden' },
                { name: 'name', label: 'Clinic name', widget: 'string' },
                { name: 'facility', widget: 'hidden' },
                { name: 'weekdays', label: 'Weekday filters', widget: 'select', multiple: true, required: false, default: [], options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], hint: 'Select every weekday on which this clinic may run. For appointments by arrangement, clear all weekdays and leave Days blank.' },
                { name: 'days', label: 'Days shown to visitors', widget: 'string', required: false, hint: 'Include any monthly restriction, e.g. second Tuesday. Leave blank for by arrangement; keep this consistent with the weekday selections.' },
                { name: 'hours', label: 'Clinic hours', widget: 'string', required: false, hint: 'Leave blank to show Call to confirm. Enter Closed for a confirmed closure.' },
                { name: 'note', label: 'Before you visit', widget: 'text', hint: 'Include lunch breaks, appointment requirements, holiday restrictions or temporary changes.' },
              ],
            },
            {
              name: 'saturdays', label: 'Main hospital Saturdays', widget: 'list', collapsed: true,
              summary: '{{fields.day}}', allow_add: false, allow_remove: false, allow_reorder: false,
              fields: [
                { name: 'day', widget: 'hidden' },
                { name: 'hours', label: 'Hours', widget: 'string', required: false, hint: 'Enter Closed for a confirmed closure, or leave blank to show Call to confirm.' },
              ],
            },
          ],
        }],
      },
      {
        name: 'news', label: 'Hospital news', folder: 'src/content/news', create: true,
        extension: 'md', format: 'frontmatter', slug: '{{slug}}',
        preview_path: 'news/{{slug}}/', editor: { preview: false },
        fields: [...common,
          { name: 'summary', label: 'Summary', widget: 'text' },
          { name: 'date', label: 'Publication date', widget: 'datetime', format: 'YYYY-MM-DD', date_format: 'YYYY-MM-DD', time_format: false, default: '' },
          { name: 'body', label: 'Article', widget: 'markdown' },
        ],
      },
      {
        name: 'stories', label: 'Patient and community stories', folder: 'src/content/stories', create: true,
        extension: 'md', format: 'frontmatter', slug: '{{slug}}',
        preview_path: 'impact-stories/{{slug}}/', editor: { preview: false },
        fields: [...common,
          { name: 'excerpt', label: 'Summary', widget: 'text' },
          { name: 'consentConfirmed', label: 'Publication consent confirmed', widget: 'boolean', default: false, hint: 'Confirm hospital approval and documented consent for this text and all images. Do not upload consent records here.' },
          { name: 'quote', label: 'Approved quotation', widget: 'text', required: false },
          { name: 'name', label: 'Approved public display name', widget: 'string', required: false },
          { name: 'body', label: 'Story', widget: 'markdown' },
        ],
      },
    ],
  };
}
