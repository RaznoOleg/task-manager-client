import { getTaskById } from '@/api/services/tasks';
import TaskDetailsForm from '@/components/TaskDetailsForm';
import TaskFormModal from '@/components/TaskFormModal';
import useTasks from '@/hooks/useTasks';
import { Task } from '@/types/task.type';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const TaskDetails = () => {
  const { id: taskId } = useParams();
  const [task, setTask] = useState<Task>();

  const {
    isModalOpen,
    selectedTask,
    selectedAddTask,
    setIsModalOpen,
    setSelectedTask,
    setSelectedAddTask,
    handleCreateTask,
    handleEditTask,
    handleAddSubtask,
    handleUpdateTask,
    handleDelete,
  } = useTasks();

  useEffect(() => {
    const fetchTask = async () => {
      if (!taskId) return;

      try {
        const taskData = await getTaskById(taskId);
        setTask(taskData);
      } catch {
        toast.error('Error getting task');
      }
    };
    fetchTask();
  }, [taskId, isModalOpen, task]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {task && (
        <TaskDetailsForm
          task={task}
          onDelete={handleDelete}
          onEdit={handleEditTask}
          onAdd={handleAddSubtask}
        />
      )}
      {isModalOpen && (
        <TaskFormModal
          task={selectedTask}
          selectedAddTask={selectedAddTask}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
            setSelectedAddTask(null);
          }}
          onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
        />
      )}
    </div>
  );
};

export default TaskDetails;
