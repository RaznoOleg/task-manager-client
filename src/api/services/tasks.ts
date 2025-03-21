import { Task } from '@/types/task.type';
import taskApi from '../taskApi';

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await taskApi.get('/tasks');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching tasks: ' + error);
  }
};

export const getTaskById = async (taskId: string): Promise<Task> => {
  try {
    const response = await taskApi.get(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching task with ID ${taskId}: ` + error);
  }
};

export const createTask = async (taskData: Task): Promise<Task> => {
  try {
    const response = await taskApi.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating task: ' + error);
  }
};

export const updateTask = async (
  taskId: string,
  taskData: Task,
): Promise<Task> => {
  try {
    const response = await taskApi.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating task with ID ${taskId}: ` + error);
  }
};

export const deleteTask = async (taskId: number): Promise<void> => {
  try {
    await taskApi.delete(`/tasks/${taskId}`);
  } catch (error) {
    throw new Error(`Error deleting task with ID ${taskId}: ` + error);
  }
};

export const addSubtask = async (
  taskId: string,
  subtaskData: Task,
): Promise<Task> => {
  try {
    const response = await taskApi.post(
      `/tasks/${taskId}/subtasks`,
      subtaskData,
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error adding subtask to task with ID ${taskId}: ` + error);
  }
};
