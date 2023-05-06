import { LabelData } from './label';

export type TaskData = {
  id: number;
  sprintID: number;
  name: string;
  assignee: string;
  assignee_id?: number;
  storyPoints: number;
  description: string;
  progress: 'Backlog' | 'In Progress' | 'In Review' | 'Done';
  startDate: Date;
  endDate: Date;
  priority: number;
  type: 'Epic' | 'Bug' | 'Spike' | 'Story' | 'Kaizen' | 'Subtask';
  cost: number;
  labels?: LabelData[];
  order: number;
};

//Incomplete function but will work for now
export function isTaskData(obj: any): obj is TaskData {
  return obj
    && obj.sprintID !== undefined && typeof obj.sprintID == 'number'
    && obj.priority !== undefined && typeof obj.priority == 'number'
}

export class TaskNotFoundError extends Error {
  id: number;
  
  constructor(m: string, id: number) {
    super(m);
    Object.setPrototypeOf(this, TaskNotFoundError.prototype);

    this.id = id;
    this.name = 'TaskNotFoundError';
    this.message = `Task with id ${this.id} not found`;
  }
};
