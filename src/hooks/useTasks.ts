import { useState } from 'react';
import {
  createTask,
  updateTask,
  deleteTask,
  addSubtask,
} from '@/api/services/tasks';
import { Task } from '@/types/task.type';
import { TaskStatus } from '@/types/taskStatus.enum';
import toast from 'react-hot-toast';

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<TaskStatus | ''>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedAddTask, setSelectedAddTask] = useState<Task | null>(null);

  const handleDelete = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      const removeTaskById = (tasks: Task[], id: number): Task[] => {
        return tasks
          .filter((task) => task.id !== id)
          .map((task) => ({
            ...task,
            subtasks: task.subtasks ? removeTaskById(task.subtasks, id) : [],
          }));
      };

      setTasks((prevTasks) => removeTaskById(prevTasks, taskId));
      setFilteredTasks((prevFilteredTasks) =>
        removeTaskById(prevFilteredTasks, taskId),
      );
    } catch {
      toast.error('Error deleting task');
    }
  };

  const handleCreateTask = async (newTask: Task) => {
    try {
      if (selectedAddTask && selectedAddTask.id) {
        const addedSubtask = await addSubtask(
          selectedAddTask.id.toString(),
          newTask,
        );
        const updateSubtasks = (
          tasks: Task[],
          parentId: number,
          subtask: Task,
        ): Task[] => {
          return tasks.map((task) => {
            if (task.id === parentId) {
              return { ...task, subtasks: [...(task.subtasks || []), subtask] };
            }
            if (task.subtasks) {
              return {
                ...task,
                subtasks: updateSubtasks(task.subtasks, parentId, subtask),
              };
            }
            return task;
          });
        };

        setTasks((prevTasks) =>
          updateSubtasks(prevTasks, selectedAddTask.id, addedSubtask),
        );
        setFilteredTasks((prevFilteredTasks) =>
          updateSubtasks(prevFilteredTasks, selectedAddTask.id, addedSubtask),
        );

        setSelectedAddTask(null);
      } else {
        const createdTask = await createTask(newTask);
        setTasks((prevTasks) => [createdTask, ...prevTasks]);
        setFilteredTasks((prevFilteredTasks) => [
          createdTask,
          ...prevFilteredTasks,
        ]);
      }

      setIsModalOpen(false);
    } catch {
      toast.error('Error handling task creation');
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    if (!selectedTask) return;

    try {
      const updateTaskRecursively = async (task: Task): Promise<Task> => {
        const newTaskData = await updateTask(task.id.toString(), task);

        if (task.subtasks && task.subtasks.length > 0) {
          const updatedSubtasks = await Promise.all(
            task.subtasks.map(updateTaskRecursively),
          );
          return { ...newTaskData, subtasks: updatedSubtasks };
        }

        return newTaskData;
      };

      const newTaskData = await updateTaskRecursively(updatedTask);

      const updateTasksState = (tasks: Task[], updatedTask: Task): Task[] => {
        return tasks.map((task) => {
          if (task.id === updatedTask.id) {
            return updatedTask;
          }
          if (task.subtasks && task.subtasks.length > 0) {
            return {
              ...task,
              subtasks: updateTasksState(task.subtasks, updatedTask),
            };
          }
          return task;
        });
      };

      setTasks((prevTasks) => updateTasksState(prevTasks, newTaskData));
      setFilteredTasks((prevFilteredTasks) =>
        updateTasksState(prevFilteredTasks, newTaskData),
      );

      setIsModalOpen(false);
      setSelectedTask(null);
    } catch {
      toast.error('Error updating task');
    }
  };

  const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleAddSubtask = (task: Task) => {
    setSelectedAddTask(task);
    setIsModalOpen(true);
  };

  return {
    tasks,
    filter,
    filteredTasks,
    selectedTask,
    selectedAddTask,
    isModalOpen,
    setTasks,
    setIsModalOpen,
    setFilteredTasks,
    setFilter,
    handleDelete,
    handleEditTask,
    handleAddSubtask,
    setSelectedTask,
    setSelectedAddTask,
    handleUpdateTask,
    handleCreateTask,
  };
};

export default useTasks;
