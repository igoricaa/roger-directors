import { sanityFetch } from '@/utils/sanity/client';
import { isMobileDevice } from '@/utils/isMobile';
import { Project } from '@/utils/types';
import { pagesCards } from '@/utils/data';
import { filterAndSortProjects } from '@/utils/utils';
import ColumnsLayout from '@/components/ColumnsLayout';

export default async function Home() {
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
  const projects: Project[] = await getProjects();
  const isMobile = isMobileDevice();

  const firstColumnItems: any[] = filterAndSortProjects(projects, 1);
  const secondColumnItems: any[] = filterAndSortProjects(projects, 2);
  const thirdColumnItems: any[] = filterAndSortProjects(projects, 3);

  firstColumnItems.splice(3, 0, pagesCards[3]);
  secondColumnItems.splice(1, 0, pagesCards[0]);
  secondColumnItems.splice(4, 0, pagesCards[1]);
  isMobile
    ? secondColumnItems.splice(6, 0, pagesCards[2])
    : thirdColumnItems.splice(1, 0, pagesCards[2]);

  return (
    <ColumnsLayout
      firstColumnItems={firstColumnItems}
      secondColumnItems={secondColumnItems}
      thirdColumnItems={thirdColumnItems}
    />
  );
}
