import { SprintData } from './sprint';

export type ProjectData = {
  id: number;
  name: string;
  color: string;
  description: string;
  startDate: Date;
  endDate: Date;
  funds: number;
  sprints: SprintData[];
};

export function isProjectData(obj: any): obj is ProjectData {
  return obj
    && obj.id !== undefined && typeof obj.id === 'number'
    && obj.name !== undefined && typeof obj.name === 'string'
    && obj.color !== undefined && typeof obj.color === 'string'
    && obj.description !== undefined && typeof obj.description === 'string'
    && obj.startDate !== undefined
    && obj.endDate !== undefined
    && obj.funds !== undefined && typeof obj.funds === 'number'
    && obj.sprints !== undefined && Array.isArray(obj.sprints);
}

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

/**
   * A small helper to convert from the backend's project format to the frontend's `ProjectData` format
   * @param backendProject the project in the backend's format
   * @returns the project as a `ProjectData` object
   */
export function backendProjectToProjectData(backendProject: BackendProjectData): ProjectData {
  return {
    id: backendProject.id,
    name: backendProject.name,
    color: `#${backendProject.color}`,
    description: backendProject.description,
    startDate: backendProject.startDate ? new Date(backendProject.startDate) :  new Date(),
    endDate: backendProject.dueDate ? new Date(backendProject.dueDate) :  new Date(),
    funds: backendProject.funds,
    sprints: [],
  };
}

/**
 * A small helper to convert from the frontend's `ProjectData` format to the backend's project format
 * @param project the project to convert to the backend's format
 * @returns the project in the backend's format
 */
export function projectDataToBackendProject(project: ProjectData): BackendProjectData {
  return {
    id: project.id,
    name: project.name,
    color: project.color.slice(1),
    description: project.description,
    startDate: project.startDate ? project.startDate.toISOString() : "",
    dueDate: project.endDate ? project.endDate.toISOString() : "",
    funds: project.funds,
  };
}
