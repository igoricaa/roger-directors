import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'pdf',
  title: 'PDF',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'title',
    }),
    defineField({
      name: 'pdfFile',
      type: 'file',
      title: 'PDF file',
      options: {
        accept: 'application/pdf',
      },
    }),
  ],
});
