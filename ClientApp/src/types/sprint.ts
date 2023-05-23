/**
 * Types and functions related to sprints
 */

import { TaskData } from './task';


/**
 * The data for a sprint
 * @property `id` - The id of the sprint
 * @property `name` - The name of the sprint
 * @property `goal` - The goal of the sprint, as a string of HTML
 * @property `startDate` - The date the sprint starts
 * @property `endDate` - The date the sprint ends
 * @property `isCompleted` - Whether or not the sprint is completed
 * @property `pointsCompleted` - The number of story points completed in the sprint
 * @property `pointsAttempted` - The number of story points attempted in the sprint
 * @property `projectId` - The id of the project the sprint is in
 * @property `isBacklog` - Whether or not the sprint is a backlog
 * @property `tasks` - The tasks in the sprint
 */
export type SprintData = {
  id: number;
  name: string;
  goal: string;
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
  pointsCompleted: number;
  pointsAttempted: number;
  projectId: number;
  isBacklog: boolean;
  tasks: TaskData[];
};

/**
 * A small helper to check if an object is a sprint
 * @param obj the object that may or may not be a sprint
 * @returns `true` if the object is a sprint, `false` otherwise
 */
export function isSprintData(obj: any): obj is SprintData {
  return obj
    && obj.id !== undefined && typeof obj.id === 'number'
    && obj.name !== undefined && typeof obj.name === 'string'
    && obj.goal !== undefined && typeof obj.goal === 'string'
    && obj.startDate !== undefined
    && obj.endDate !== undefined
    && obj.isCompleted !== undefined && typeof obj.isCompleted === 'boolean'
    && obj.pointsCompleted !== undefined && typeof obj.pointsCompleted === 'number'
    && obj.pointsAttempted !== undefined && typeof obj.pointsAttempted === 'number'
    && obj.projectId !== undefined && typeof obj.projectId === 'number'
    && obj.isBacklog !== undefined && typeof obj.isBacklog === 'boolean'
    && obj.tasks !== undefined && Array.isArray(obj.tasks);
}

/**
 * The data for a sprint as it is stored in the backend
 * @property `id` - The id of the sprint
 * @property `name` - The name of the sprint
 * @property `projectID` - The id of the project the sprint is in
 * @property `goal` - The goal of the sprint, as a string of HTML
 * @property `storyPointsAttempted` - The number of story points attempted in the sprint
 * @property `storyPointsCompleted` - The number of story points completed in the sprint
 * @property `isBacklog` - Whether or not the sprint is a backlog
 * @property `isCompleted` - Whether or not the sprint is completed
 * @property `startDate` - The date the sprint starts, as an ISO string
 * @property `endDate` - The date the sprint ends, as an ISO string
 */
export type BackendSprintData = {
  id: number;
  name: string;
  projectID: number;
  goal: string;
  storyPointsAttempted: number;
  storyPointsCompleted: number;
  isBacklog: boolean;
  isCompleted: boolean;
  startDate: string;
  endDate: string;
};

/**
 * An error thrown when a sprint is not found
 * @property `id` - The id of the sprint that was not found
 */
export class SprintNotFoundError extends Error {
  id: number;
  
  constructor(m: string, id: number) {
    super(m);
    Object.setPrototypeOf(this, SprintNotFoundError.prototype);

    this.id = id;
    this.name = 'SprintNotFoundError';
    this.message = `Sprint with id ${this.id} not found`;
  }
};

/**
 * A small helper to convert from the backend's sprint format to the frontend's `SprintData` format
 * @param backendSprint the sprint in the backend's format
 * @returns the sprint as a `SprintData` object
 */
export function backendSprintToSprintData(backendSprint: BackendSprintData): SprintData {
  return {
    id: backendSprint.id,
    name: backendSprint.name,
    goal: backendSprint.goal,
    startDate: new Date(backendSprint.startDate),
    endDate: new Date(backendSprint.endDate),
    isCompleted: backendSprint.isCompleted,
    pointsCompleted: backendSprint.storyPointsCompleted,
    pointsAttempted: backendSprint.storyPointsAttempted,
    projectId: backendSprint.projectID,
    isBacklog: backendSprint.isBacklog,
    tasks: [],
  };
}

/**
 * A small helper to convert from the frontend's `SprintData` format to the backend's sprint format
 * @param sprint the sprint to convert to the backend's format
 * @returns the sprint in the backend's format
 */
export function sprintDataToBackendSprint(sprint: SprintData): BackendSprintData {
  return {
    id: sprint.id,
    name: sprint.name,
    projectID: sprint.projectId,
    goal: sprint.goal,
    storyPointsAttempted: sprint.pointsAttempted,
    storyPointsCompleted: sprint.pointsCompleted,
    isBacklog: sprint.isBacklog,
    isCompleted: sprint.isCompleted,
    startDate: sprint.startDate.toISOString(),
    endDate: sprint.endDate.toISOString(),
  };
}
