import { type SchemaTypeDefinition } from 'sanity';
import teamMember from './schemas/documents/teamMember';
import project from './schemas/documents/project';
import reservoirProject from './schemas/documents/reservoirProject';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [teamMember, project, reservoirProject],
};
