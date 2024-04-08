'use server';
import { client } from '@/utils/sanity/client';

export type TeamMember = {
  _id: number;
  name: string;
  imageUrl: string;
  bio: string;
};

export async function getTeam() {
  const teamMembers = await client.fetch<TeamMember[]>(
    `*[_type == "teamMember"]{
            _id,
            name,
            bio,
            "image": picture.asset->url,
            "imageAlt": picture.alt
          }`,
    {},
    {
      cache: 'force-cache',
      next: { tags: ['teamMember'] },
    }
  );

  return teamMembers;
}
