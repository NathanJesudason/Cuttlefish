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

export type BackendSprintData = {
  id: number;
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
    name: '',
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
    projectID: sprint.projectId,
    goal: '',
    storyPointsAttempted: sprint.pointsAttempted,
    storyPointsCompleted: sprint.pointsCompleted,
    isBacklog: sprint.isBacklog,
    isCompleted: sprint.isCompleted,
    startDate: sprint.startDate.toISOString(),
    endDate: sprint.endDate.toISOString(),
  };
}
