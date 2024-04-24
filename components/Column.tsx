import { PageCard } from './PageCard';
import ProjectCard from './ProjectCard';
import ReservoirProjectCard from './ReservoirProjectCard';

const Column = ({
  columnItems,
  priorityIndexes,
}: {
  columnItems: any[];
  priorityIndexes: number[];
}) => {
  return (
    <div>
      {columnItems.map((item: any, index: number) => {
        return item.type === 'page' ? (
          <PageCard key={index} content={item} size={item.size} />
        ) : item.type === 'project' ? (
          <ProjectCard
            key={index}
            project={item}
            priority={priorityIndexes.includes(index)}
          />
        ) : (
          <ReservoirProjectCard
            key={index}
            project={item}
            priority={priorityIndexes.includes(index)}
          />
        );
      })}
    </div>
  );
};

export default Column;
