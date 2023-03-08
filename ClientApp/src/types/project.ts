import { SprintData } from './sprint';

export type ProjectData = {
  id: number;
  name: string;
  color: string;
  description: string;
  startDate?: Date;
  endDate?: Date;
  funds: number;
  sprints: SprintData[];
};

export type BackendProjectData = {
  id: number;
  name: string;
  color: string;
  description: string;
  startDate?: string;
  dueDate?: string;
  funds: number;
}

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
