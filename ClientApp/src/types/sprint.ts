import { TaskData } from './task';

export type SprintData = {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  isCompleted: boolean;
  pointsCompleted: number;
  pointsAttempted: number;
  projectId: number;
  isBacklog: boolean;
  tasks: TaskData[];
};

export function isSprintData(obj: any): obj is SprintData {
  return obj
    && obj.id !== undefined && typeof obj.id === 'number'
    && obj.name !== undefined && typeof obj.name === 'string'
    && obj.startDate !== undefined
    && obj.endDate !== undefined
    && obj.isCompleted !== undefined && typeof obj.isCompleted === 'boolean'
    && obj.pointsCompleted !== undefined && typeof obj.pointsCompleted === 'number'
    && obj.pointsAttempted !== undefined && typeof obj.pointsAttempted === 'number'
    && obj.projectId !== undefined && typeof obj.projectId === 'number'
    && obj.isBacklog !== undefined && typeof obj.isBacklog === 'boolean'
    && obj.tasks !== undefined && Array.isArray(obj.tasks);
}

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
    goal: '',
    storyPointsAttempted: sprint.pointsAttempted,
    storyPointsCompleted: sprint.pointsCompleted,
    isBacklog: sprint.isBacklog,
    isCompleted: sprint.isCompleted,
    startDate: sprint.startDate ? sprint.startDate.toISOString() : '',
    endDate: sprint.endDate ? sprint.endDate.toISOString() : '',
  };
}
