import { Task } from '@/types/task.type';
import StatusBadge from '../StatusBadge';
import SubtaskList from '../SubtaskList';
import { useNavigate } from 'react-router-dom';
import IconTaskButton, { ButtonType } from '../Buttons/IconTaskButton';

interface TaskDetailsFormProps {
  task: Task;
  onDelete: (taskId: number) => void;
  onEdit: (task: Task) => void;
  onAdd: (task: Task) => void;
}

const TaskDetailsForm = ({
  task,
  onDelete,
  onEdit,
  onAdd,
}: TaskDetailsFormProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="mx-auto p-12 bg-white shadow-2xl rounded-xl border border-gray-200 my-10 w-8/12">
      <div className="flex justify-between">
        <button
          onClick={handleGoBack}
          className="px-6 py-2 mb-6 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Go Back
        </button>

        <div className="flex gap-4">
          <div className="flex items-center gap-4">
            <StatusBadge status={task.status} />
          </div>
          <IconTaskButton onClick={() => onAdd(task)} type={ButtonType.ADD} />
          <IconTaskButton onClick={() => onEdit(task)} type={ButtonType.EDIT} />
          <IconTaskButton
            onClick={() => {
              handleGoBack();
              onDelete(task.id);
            }}
            type={ButtonType.DELETE}
          />
        </div>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        {task.title}
      </h1>
      <div className="mb-6">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-gray-700">Description</h2>
        </div>
        <p className="text-gray-800 mt-2 leading-relaxed">
          {task.description
            ? task.description
            : 'Description not yet specified'}
        </p>
      </div>
      {task.subtasks && task.subtasks.length > 0 && (
        <div className="mt-8 p-4 bg-gray-100 rounded-xl shadow-2xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Subtasks
          </h2>
          <SubtaskList
            subtasks={task.subtasks}
            onAdd={onAdd}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        </div>
      )}
      <p className=" text-gray-500 text-right mt-4">
        Created: {new Date(task.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default TaskDetailsForm;
