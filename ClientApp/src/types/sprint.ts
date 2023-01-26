import { TaskData } from './task';

export type SprintData = {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  pointsCompleted: number;
  pointsAttempted: number;
  projectId: number;
  isBacklog: boolean;
  tasks: TaskData[];
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
