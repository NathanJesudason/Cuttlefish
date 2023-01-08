import { SprintData } from './sprint';

export type ProjectData = {
  id: number;
  name: string;
  sprints: SprintData[];
};

export class ProjectNotFoundError extends Error {
  id: number;
  
  constructor(m: string, id: number) {
    super(m);
    Object.setPrototypeOf(this, ProjectNotFoundError.prototype);

    this.id = id;
    this.name = 'ProjectNotFoundError';
    this.message = `Project with id ${this.id} not found`;
  }
};

