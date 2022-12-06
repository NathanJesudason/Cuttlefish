import { TaskData } from "./task";

export type SprintData = {
  id: number;
  name: string;
  dueDate: Date;
  complete: boolean;
  tasks: TaskData[];
};
