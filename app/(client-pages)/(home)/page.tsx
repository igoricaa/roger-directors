import { sanityFetch } from '@/utils/sanity/client';
import { Project } from '@/utils/types';
import ColumnsLayout from '@/components/ColumnsLayout';

async function getProjects() {
  'use server';
  const projects: Project[] = await sanityFetch({
    query: `*[_type == "project"]{
      title,
      'type': _type,
      slug,
      'desktopOrder': {
        'column': desktopOrder.column,
        'columnOrder': desktopOrder.columnOrder
      },
      'mobileOrder': {
        'column': mobileOrder.column,
        'columnOrder': mobileOrder.columnOrder
      },
      'featuredContent': {
        featuredSize,
        'featuredImage': {
          'url': featuredImage.asset->url,
          'alt': featuredImage.alt,
        },
        'featuredVideo': {
          'playbackId': featuredVideo.video.asset->playbackId
        },
      }
    }`,
    tags: ['project'],
  });

  return projects;
}

export default async function Home() {
  const projects: Project[] = await getProjects();

  return <ColumnsLayout projects={projects} />;
}
