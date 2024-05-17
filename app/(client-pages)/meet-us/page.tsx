import { sanityFetch } from '@/utils/sanity/client';
import TeamMembers from '@/components/TeamMembers';
import { TeamMember } from '@/utils/types';

async function getTeamMembers() {
  const teamMembers: TeamMember[] = await sanityFetch({
    query: `*[_type == "teamMember"]{
      _id,
      name,
      position,
      order,
      bio,
      "imageUrl": picture.asset->url,
      "imageAlt": picture.alt,
      'videoPlaybackId': teamMemberVideo.playbackId,
      'videoUrl': teamMemberVideo.video.asset->playbackId,
      'videoTitle': teamMemberVideo.title,
    }`,
    tags: ['teamMember'],
  });

  return teamMembers;
}

export default async function MeetTheTeam() {
  const teamMembers: TeamMember[] = await getTeamMembers();

  return (
    <main>
      <header>
        <h1>Meet Us</h1>
      </header>

      <TeamMembers teamMembers={teamMembers} />
    </main>
  );
}
