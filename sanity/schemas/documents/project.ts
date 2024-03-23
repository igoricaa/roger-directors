import { ProjectsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
  icon: ProjectsIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'loopText',
      title: 'Loop Text',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descriptionTitle',
      title: 'Description Title',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'descriptionExcerpt',
      title: 'Description Excerpt',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        {
          title: 'Video',
          name: 'video',
          type: 'document',
          fields: [
            { title: 'Title', name: 'title', type: 'string' },
            {
              title: 'Video file',
              name: 'video',
              type: 'mux.video',
            },
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessiblity.',
              validation: (rule) => {
                return rule.custom((alt, context) => {
                  if ((context.document?.picture as any)?.asset?._ref && !alt) {
                    return 'Required';
                  }
                  return true;
                });
              },
            },
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
});
