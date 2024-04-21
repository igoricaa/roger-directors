import { isMobileDevice } from '@/utils/isMobile';
import styles from './ColumnsLayout.module.css';
import ProjectCard from './ProjectCard';
import { PageCard } from './PageCard';

export default function ColumnsLayout({
  firstColumnItems,
  secondColumnItems,
  thirdColumnItems,
}: {
  firstColumnItems: any[];
  secondColumnItems: any[];
  thirdColumnItems: any[];
}) {
  const isMobile = isMobileDevice();
  const priorityIndexes: number[] = isMobile ? [0, 1, 2] : [0, 1];

  return (
    <main className={styles.main}>
      <Column
        columnItems={firstColumnItems}
        priorityIndexes={priorityIndexes}
      />
      <Column
        columnItems={secondColumnItems}
        priorityIndexes={priorityIndexes}
      />
      {!isMobile && (
        <Column
          columnItems={thirdColumnItems}
          priorityIndexes={priorityIndexes}
        />
      )}
    </main>
  );
}

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
        ) : (
          <ProjectCard
            key={index}
            project={item}
            priority={priorityIndexes.includes(index)}
          />
        );
      })}
    </div>
  );
};
