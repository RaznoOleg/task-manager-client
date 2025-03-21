import { FieldArray } from 'formik';
import { Task } from '@/types/task.type';
import TaskFields from '../TaskFields';
import { PlusIcon, Trash2 } from 'lucide-react';
import { TaskStatus } from '@/types/taskStatus.enum';

interface SubtaskFieldsProps {
  name: string;
  task: Task;
  remove: () => void;
  isEditMode: boolean;
}

const SubtaskFields = ({
  name,
  task,
  remove,
  isEditMode,
}: SubtaskFieldsProps) => (
  <div className="border p-4 rounded-lg shadow-sm mb-3 bg-gray-50 relative">
    <TaskFields name={`${name}`} />

    <FieldArray name={`${name}.subtasks`}>
      {({ push, remove }) => (
        <div className="ml mt-3">
          {(task.subtasks || []).map((_, idx) => (
            <SubtaskFields
              key={idx}
              name={`${name}.subtasks.${idx}`}
              task={task.subtasks?.[idx] as Task}
              remove={() => remove(idx)}
              isEditMode={isEditMode}
            />
          ))}
          {!isEditMode && (
            <button
              type="button"
              onClick={() =>
                push({
                  title: '',
                  description: '',
                  status: TaskStatus.TODO,
                  subtasks: [],
                })
              }
              className="mt-3 text-blue-500 hover:text-blue-700 transition flex items-center"
            >
              <PlusIcon size={20} /> Add subtask
            </button>
          )}
        </div>
      )}
    </FieldArray>
    {!isEditMode && (
      <button
        type="button"
        onClick={remove}
        className="absolute bottom-3 right-3 p-2 rounded-full text-red-500 hover:bg-red-100 transition"
      >
        <Trash2 size={20} />
      </button>
    )}
  </div>
);

export default SubtaskFields;
