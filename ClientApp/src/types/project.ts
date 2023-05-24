/**
 * All types and functions related to projects
 */

import { SprintData } from './sprint';


/**
 * The data for a project
 * @property `id` - The id of the project
 * @property `name` - The name of the project
 * @property `color` - The color of the project, as a hex string with the leading `#`
 * @property `description` - The description of the project, as a string of HTML
 * @property `startDate` - The date the project starts
 * @property `endDate` - The date the project ends
 * @property `funds` - The amount of funds the project has, in dollars
 * @property `sprints` - The sprints in the project
 */
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

/**
 * A small helper to check if an object is a project
 * @param obj the object that may or may not be a project
 * @returns `true` if the object is a project, `false` otherwise
 */
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

/**
 * The data for a project as it is stored in the backend
 * @property `id` - The id of the project
 * @property `name` - The name of the project
 * @property `color` - The color of the project, as a hex string without the leading `#`
 * @property `description` - The description of the project, as a string of HTML
 * @property `startDate` - The date the project starts, as an ISO string
 * @property `dueDate` - The date the project ends, as an ISO string
 * @property `funds` - The amount of funds the project has, in dollars
 */
export type BackendProjectData = {
  id: number;
  name: string;
  color: string;
  description: string;
  startDate: string;
  dueDate: string;
  funds: number;
}

/**
 * An error to throw when the requested project is not found
 * @property `id` - The id of the project that was not found
 */
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
    startDate: new Date(backendProject.startDate),
    endDate: new Date(backendProject.dueDate),
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
    startDate: project.startDate.toISOString(),
    dueDate: project.endDate.toISOString(),
    funds: project.funds,
  };
}
