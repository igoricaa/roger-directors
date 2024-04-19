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
      title: 'Desktop Order',
      name: 'desktopOrder',
      type: 'object',
      fields: [
        {
          name: 'column',
          type: 'number',
          title: 'Column',
          initialValue: 1,
          options: { list: [1, 2, 3] },
        },
        {
          name: 'columnOrder',
          type: 'number',
          title: 'Column Order',
        },
      ],
    }),
    defineField({
      title: 'Mobile Order',
      name: 'mobileOrder',
      type: 'object',
      fields: [
        {
          name: 'column',
          type: 'number',
          title: 'Column',
          initialValue: 1,
          options: { list: [1, 2] },
        },
        {
          name: 'columnOrder',
          type: 'number',
          title: 'Column Order',
        },
      ],
    }),
    defineField({
      name: 'featuredSize',
      title: 'Featured Size',
      type: 'string',
      initialValue: 'small',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
          { title: 'Square', value: 'square' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
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
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featuredVideo',
      title: 'Featured Video',
      type: 'document',
      fields: [
        { title: 'Title', name: 'title', type: 'string' },
        {
          title: 'Video file',
          name: 'video',
          type: 'mux.video',
        },
      ],
    }),
    defineField({
      name: 'slideImage',
      title: 'Slide Image',
      type: 'image',
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
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        {
          title: 'Videos Pair',
          name: 'videosPair',
          type: 'document',
          fields: [
            {
              title: 'Title',
              name: 'title',
              type: 'string',
            },
            {
              title: 'Full Video',
              name: 'fullVideo',
              type: 'document',
              fields: [
                {
                  title: 'PlaybackId',
                  name: 'playbackId',
                  type: 'string',
                },
                {
                  title: 'Video file',
                  name: 'video',
                  type: 'mux.video',
                },
              ],
            },
            {
              title: 'Slide Video',
              name: 'slideVideo',
              type: 'document',
              fields: [
                {
                  title: 'PlaybackId',
                  name: 'playbackId',
                  type: 'string',
                },
                {
                  title: 'Video file',
                  name: 'video',
                  type: 'mux.video',
                },
              ],
            },
          ],
        },
      ],
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
    }),
  ],
});
