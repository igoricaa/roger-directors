import { sanityFetch } from '@/utils/sanity/client';
import { Project } from '@/utils/types';
import ColumnsLayout from '@/components/ColumnsLayout';

export default async function Reservoir() {
  async function getReservoirProjects() {
    'use server';

    const projects: Project[] = await sanityFetch({
      query: `*[_type == "reservoirProject"]{
        'id': _id,
        'type': _type,
        title,
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
        },
        'previewContent': {
          'previewImage': {
            'url': previewImage.asset->url,
            'alt': previewImage.alt,
          },
          'previewVideo': {
            'playbackId': previewVideo.video.asset->playbackId
          },
        }
      }`,
      tags: ['reservoirProject'],
    });

    return projects;
  }
  const projects: Project[] = await getReservoirProjects();

  return <ColumnsLayout projects={projects} />;
}
