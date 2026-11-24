import {defineField, defineType} from 'sanity';

export const story = defineType({
  name: 'story',
  title: 'Patient & community story',
  type: 'document',
  fields: [
    defineField({name: 'title', type: 'string', validation: rule => rule.required()}),
    defineField({
      name: 'slug', title: 'Page address', type: 'slug',
      description: 'Click Generate. Keep it unchanged after publishing so links keep working.',
      options: {source: 'title', maxLength: 80},
      validation: rule => rule.required().custom(value =>
        !value?.current || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current)
          ? true : 'Use lowercase letters, numbers and hyphens only.'),
    }),
    defineField({name: 'excerpt', title: 'Summary', type: 'text', rows: 3, validation: rule => rule.required()}),
    defineField({
      name: 'consentConfirmed', title: 'Publication consent confirmed', type: 'boolean', initialValue: false,
      description: 'Tick only after the hospital has approved this story and documented consent for the text and every photo. Do not upload consent records here.',
      validation: rule => rule.custom(value => value === true
        ? true : 'A story cannot be published until consent is confirmed. You can still save it as a draft.'),
    }),
    defineField({name: 'quote', title: 'Approved quotation', type: 'text', rows: 3}),
    defineField({name: 'name', title: 'Approved public display name', type: 'string'}),
    defineField({name: 'body', title: 'Story', type: 'richText', validation: rule => rule.required()}),
  ],
  preview: {
    select: {title: 'title', consent: 'consentConfirmed'},
    prepare: ({title, consent}) => ({title, subtitle: consent ? 'Consent confirmed' : 'Consent not yet confirmed'}),
  },
});
