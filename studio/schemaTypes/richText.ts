import {defineArrayMember, defineField, defineType} from 'sanity';

// Article body used by news and stories. Kept deliberately small so the
// website renderer (src/lib/portable-text.ts) supports everything staff can enter.
export const richText = defineType({
  name: 'richText',
  title: 'Text',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Paragraph', value: 'normal'},
        {title: 'Heading', value: 'h2'},
        {title: 'Subheading', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [
        {title: 'Bullets', value: 'bullet'},
        {title: 'Numbers', value: 'number'},
      ],
      marks: {
        decorators: [
          {title: 'Bold', value: 'strong'},
          {title: 'Italic', value: 'em'},
        ],
        annotations: [{
          name: 'link',
          type: 'object',
          title: 'Link',
          fields: [defineField({
            name: 'href',
            type: 'url',
            title: 'Address',
            validation: rule => rule.required().uri({scheme: ['http', 'https', 'mailto', 'tel'], allowRelative: true}),
          })],
        }],
      },
    }),
    defineArrayMember({
      type: 'image',
      title: 'Photo',
      options: {hotspot: true},
      description: 'Only publication-approved photos. Never upload patient records or consent forms.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Photo description',
          description: 'Describe the photo for visitors using screen readers.',
          validation: rule => rule.required(),
        }),
        defineField({name: 'caption', type: 'string', title: 'Caption'}),
      ],
    }),
  ],
});
