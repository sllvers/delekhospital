import {defineField, defineType} from 'sanity';

export const news = defineType({
  name: 'news',
  title: 'Hospital news',
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
    defineField({
      name: 'date', title: 'Publication date', type: 'date',
      description: 'The confirmed date of the announcement.',
      options: {dateFormat: 'YYYY-MM-DD'},
      validation: rule => rule.required(),
    }),
    defineField({name: 'summary', type: 'text', rows: 3, validation: rule => rule.required()}),
    defineField({name: 'body', title: 'Article', type: 'richText', validation: rule => rule.required()}),
  ],
  orderings: [{title: 'Newest first', name: 'dateDesc', by: [{field: 'date', direction: 'desc'}]}],
  preview: {select: {title: 'title', subtitle: 'date'}},
});
