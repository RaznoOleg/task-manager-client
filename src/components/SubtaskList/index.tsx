import { Task } from '@/types/task.type';
import StatusBadge from '../StatusBadge';
import IconTaskButton, { ButtonType } from '../Buttons/IconTaskButton';

interface SubtaskListProps {
  subtasks: Task[];
  onDelete: (taskId: number) => void;
  onEdit: (task: Task) => void;
  onAdd: (task: Task) => void;
}

const SubtaskList = ({
  subtasks,
  onDelete,
  onEdit,
  onAdd,
}: SubtaskListProps) => {
  const renderSubtasks = (subtasks: Task[], level: number = 0) => {
    if (!subtasks || subtasks.length === 0) {
      return null;
    }

    return (
      <ul className={`mt-2 space-y-3 pl-${level * 6}`}>
        {subtasks.map((subtask) => (
          <li
            key={subtask.id}
            className="p-5 bg-gradient-to-r rounded-xl shadow-lg border-l-4 border-b-4 border-t border-r border-indigo-500 transition-all duration-300 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{subtask.title}</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-4">
                  <StatusBadge status={subtask.status} />
                </div>
                <IconTaskButton
                  onClick={() => onAdd(subtask)}
                  type={ButtonType.ADD}
                />
                <IconTaskButton
                  onClick={() => onEdit(subtask)}
                  type={ButtonType.EDIT}
                />
                <IconTaskButton
                  onClick={() => {
                    onDelete(subtask.id);
                  }}
                  type={ButtonType.DELETE}
                />
              </div>
            </div>
            {subtask.description && (
              <p className="text-base text-gray-700 mt-2 leading-relaxed">
                {subtask.description}
              </p>
            )}
            <p className="text-gray-500 text-right mt-2 mb-6">
              Created: {new Date(subtask.createdAt).toLocaleString()}
            </p>
            {subtask.subtasks && renderSubtasks(subtask.subtasks, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return <div className="mt-4">{renderSubtasks(subtasks, 0)}</div>;
};

export default SubtaskList;
