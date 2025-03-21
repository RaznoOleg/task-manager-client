import { Task } from '@/types/task.type';
import StatusBadge from '../StatusBadge';
import { ChevronDown, ChevronRight, CircleChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import IconTaskButton, { ButtonType } from '../Buttons/IconTaskButton';

interface TaskItemProps {
  task: Task;
  level?: number;
  onDelete: (taskId: number) => void;
  onEdit: (task: Task) => void;
  onAdd: (task: Task) => void;
}

const TaskItem = ({
  task,
  level = 0,
  onDelete,
  onEdit,
  onAdd,
}: TaskItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <tr className="border-b bg-white hover:bg-gray-100 transition-colors">
        <td className="px-7 py-4 text-gray-800 font-medium max-w-xs truncate">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {task.subtasks && task.subtasks.length > 0 && (
              <span className="mr-2">
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                )}
              </span>
            )}
            <span style={{ marginLeft: `${level * 16}px` }}>{task.title}</span>
          </div>
        </td>
        <td className="text-center px-8 py-4">
          <StatusBadge status={task.status} />
        </td>
        <td className="text-center px-8 py-4">
          <IconTaskButton onClick={() => onAdd(task)} type={ButtonType.ADD} />
        </td>
        <td className="text-center px-8 py-4">
          <IconTaskButton onClick={() => onEdit(task)} type={ButtonType.EDIT} />
        </td>
        <td className="text-center px-7 py-4">
          <IconTaskButton
            onClick={() => onDelete(task.id)}
            type={ButtonType.DELETE}
          />
        </td>
        <td className="text-center px-7 py-4">
          <Link
            to={`/task/details/${task.id}`}
            className="inline-flex justify-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <CircleChevronRight className="w-5 h-5 cursor-pointer" />
          </Link>
        </td>
      </tr>

      {isExpanded &&
        task.subtasks?.map((subtask) => (
          <TaskItem
            key={subtask.id}
            task={subtask}
            level={level + 1}
            onDelete={onDelete}
            onEdit={onEdit}
            onAdd={onAdd}
          />
        ))}
    </>
  );
};

export default TaskItem;
