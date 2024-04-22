import { sanityFetch } from '@/utils/sanity/client';
import { Project } from '@/utils/types';
import { filterAndSortProjects } from '@/utils/utils';
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

  const firstColumnItems: any[] = filterAndSortProjects(projects, 1);
  const secondColumnItems: any[] = filterAndSortProjects(projects, 2);
  const thirdColumnItems: any[] = filterAndSortProjects(projects, 3);

  return (
    <ColumnsLayout
      firstColumnItems={firstColumnItems}
      secondColumnItems={secondColumnItems}
      thirdColumnItems={thirdColumnItems}
    />
  );
}
