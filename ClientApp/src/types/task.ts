export type TaskData = {
  id: number;
  name: string;
  assignee: string;
  storyPoints: number;
  description: string;
  progress: 'Backlog' | 'In Progress' | 'In Review' | 'Done';
  startDate: Date | null;
  endDate: Date | null;
};
