import { TaskStatus } from './taskStatus.enum';

export type Task = {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: Date;
  subtasks?: Task[];
};
