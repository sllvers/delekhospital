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
