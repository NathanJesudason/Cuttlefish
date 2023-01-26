export type TaskData = {
  id: number;
  name: string;
  assignee: string;
  storyPoints: number;
  description: string;
  progress: 'Backlog' | 'In Progress' | 'In Review' | 'Done';
  startDate?: Date;
  endDate?: Date;
};

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
