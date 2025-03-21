import { Task } from '@/types/task.type';
import TaskItem from '../TaskItem';

interface TasksListProps {
  tasks: Task[];
  onDeleteTask: (taskId: number) => void;
  onEditTask: (task: Task) => void;
  onAddSubtask: (task: Task) => void;
}

const TasksList = ({
  tasks,
  onDeleteTask,
  onEditTask,
  onAddSubtask,
}: TasksListProps) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg">
      <table className="w-full border-collapse bg-white overflow-hidden rounded-xl">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <th className="px-7 py-4 text-left font-semibold w-3/5">Title</th>
            <th className="px-7 py-4 font-semibold w-2/5">Status</th>
            <th className="px-7 py-4 font-semibold w-1/5">Add</th>
            <th className="px-7 py-4 font-semibold w-1/5">Edit</th>
            <th className="px-7 py-4 font-semibold w-1/5">Delete</th>
            <th className="px-7 py-4 font-semibold w-1/5">Details</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-7 py-4 text-gray-800 font-medium text-center"
              >
                No tasks found
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onDelete={onDeleteTask}
                onEdit={onEditTask}
                onAdd={onAddSubtask}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TasksList;
