import { ProjectsIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'reservoirProject',
  title: 'Reservoir Project',
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
          validation: (rule) => rule.required(),
        },
        {
          name: 'columnOrder',
          type: 'number',
          title: 'Column Order',
          validation: (rule) => rule.required(),
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
          validation: (rule) => rule.required(),
        },
        {
          name: 'columnOrder',
          type: 'number',
          title: 'Column Order',
          validation: (rule) => rule.required(),
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
      name: 'previewImage',
      title: 'Preview Image',
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
      name: 'previewVideo',
      title: 'Preview Video',
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
  ],
});
