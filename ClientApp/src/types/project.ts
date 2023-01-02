import { SprintData } from './sprint';

export type ProjectData = {
  id: number;
  name: string;
  sprints: SprintData[];
};
