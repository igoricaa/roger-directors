import { type SchemaTypeDefinition } from 'sanity';
import teamMember from './schemas/documents/teamMember';
import project from './schemas/documents/project';
import reservoirProject from './schemas/documents/reservoirProject';
import pdf from './schemas/documents/pdf';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [teamMember, project, reservoirProject, pdf],
};
