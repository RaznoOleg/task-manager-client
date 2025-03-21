import { ErrorMessage, Field } from 'formik';
import { TaskStatus } from '@/types/taskStatus.enum';

interface TaskFieldsProps {
  name: string;
}

const TaskFields = ({ name }: TaskFieldsProps) => (
  <div className="space-y-3">
    <Field
      name={name ? `${name}.title` : 'title'}
      placeholder="Title"
      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
    />
    <ErrorMessage
      name={name ? `${name}.title` : 'title'}
      component="div"
      className="text-red-500 text-sm"
    />
    <Field
      as="textarea"
      name={name ? `${name}.description` : 'description'}
      placeholder="Description"
      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      rows={4}
    />
    <Field
      as="select"
      name={name ? `${name}.status` : 'status'}
      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
    >
      {Object.values(TaskStatus).map((status) => (
        <option key={status} value={status}>
          {status.replace('-', ' ').toUpperCase()}
        </option>
      ))}
    </Field>
  </div>
);

export default TaskFields;
