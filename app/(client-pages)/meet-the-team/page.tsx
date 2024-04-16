import { sanityFetch } from '@/utils/sanity/client';
import TeamMembers from '@/components/TeamMembers';
import { TeamMember } from '@/utils/sanity/fetchData';

// TODO: generateStaticParams

async function getTeamMembers() {
  const teamMembers: TeamMember[] = await sanityFetch({
    query: `*[_type == "teamMember"]{
      _id,
      name,
      bio,
      "image": picture.asset->url,
      "imageAlt": picture.alt,
      'videoPlaybackId': teamMemberVideo.playbackId,
      'video': teamMemberVideo.video.asset->playbackId,
      'videoTitle': teamMemberVideo.title,
    }`,
    tags: ['teamMember'],
  });

  console.log('teamMembers:', teamMembers)

  return teamMembers;
}

export default async function MeetTheTeam() {
  const teamMembers = await getTeamMembers();

  return (
    <main>
      <header>
        <h1>Meet the Team</h1>
      </header>

      <TeamMembers teamMembers={teamMembers} />
    </main>
  );
}
