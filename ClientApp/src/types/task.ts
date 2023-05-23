/**
 * All types and functions related to tasks
 */

import { CommentData } from './comment';
import { LabelData } from './label';


/**
 * The data for a task
 * @property `id` - The id of the task
 * @property `sprintID` - The id of the sprint the task is in
 * @property `name` - The name of the task
 * @property `assignee` - The name of the team member assigned to the task
 * @property `assignee_id` - The id of the team member assigned to the task
 * @property `storyPoints` - The number of story points the task is worth
 * @property `description` - The description of the task, as a string of HTML
 * @property `progress` - The progress of the task (Backlog, In Progress, In Review, Done)
 * @property `startDate` - The date the task starts
 * @property `endDate` - The date the task ends
 * @property `priority` - The priority of the task
 * @property `type` - The type of the task (Epic, Bug, Spike, Story, Kaizen, Subtask)
 * @property `cost` - The cost of the task, in dollars
 * @property `dependencies` - The ids of the tasks this task depends on
 * @property `labels` - The labels on this task
 * @property `order` - The order of the task in its sprint
 * @property `comments` - The comments on this task
 */
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
  dependencies?: number[];
  labels?: LabelData[];
  order: number;
  comments: CommentData[];
};

/**
 * A small helper to check if an object is a task
 * @param obj the object that may or may not be a task
 * @returns `true` if the object is a task, `false` otherwise
 */
export function isTaskData(obj: any): obj is TaskData {
  return obj
    && obj.id !== undefined && typeof obj.id == 'number'
    && obj.sprintID !== undefined && typeof obj.sprintID == 'number'
    && obj.name !== undefined && typeof obj.name == 'string'
    && obj.assignee !== undefined && typeof obj.assignee == 'string'
    && obj.storyPoints !== undefined && typeof obj.storyPoints == 'number'
    && obj.description !== undefined && typeof obj.description == 'string'
    && obj.progress !== undefined && typeof obj.progress == 'string'
    && obj.startDate !== undefined
    && obj.endDate !== undefined
    && obj.priority !== undefined && typeof obj.priority == 'number'
    && obj.type !== undefined && typeof obj.type == 'string'
    && obj.cost !== undefined && typeof obj.cost == 'number'
    && obj.order !== undefined && typeof obj.order == 'number'
    && obj.comments !== undefined && Array.isArray(obj.comments);
}

/**
 * Error to throw when a task is not found
 * @property `id` - The id of the task that was not found
 */
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
