import { TaskSchema } from '@/schemas/taskSchema';
import { Task } from '@/types/task.type';
import { TaskStatus } from '@/types/taskStatus.enum';
import { FieldArray, Form, Formik } from 'formik';
import TaskFields from './TaskFields';
import SubtaskFields from './SubTaskFields';
import { PlusIcon } from 'lucide-react';

interface TaskFormModalProps {
  task: Task | null;
  selectedAddTask: Task | null;
  onClose: () => void;
  onSubmit: (newTask: Task) => void;
}

const TaskFormModal = ({
  task,
  selectedAddTask,
  onClose,
  onSubmit,
}: TaskFormModalProps) => {
  const initialValues: Task = task || {
    id: 0,
    title: '',
    description: '',
    status: TaskStatus.TODO,
    createdAt: new Date(),
    subtasks: [],
  };

  const isEditMode = !!task;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-xl w-2/3 max-w-5xl">
        <h2 className="text-lg rounded-t-xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center h-14 flex items-center justify-center border-none">
          {isEditMode
            ? 'Edit Task'
            : selectedAddTask
              ? 'Add Subtask'
              : 'Create Task'}
        </h2>
        <div className="pl-8 pr-8 pb-8 flex flex-col relative max-h-[670px]">
          <Formik
            initialValues={initialValues}
            validationSchema={TaskSchema}
            onSubmit={(values) => {
              onSubmit(values);
              onClose();
            }}
          >
            {({ values }) => (
              <Form className="space-y-4 flex-grow overflow-y-auto mb-10 p-5">
                <h3 className="font-medium">
                  {selectedAddTask ? 'Subtask' : 'Task'}
                </h3>
                <TaskFields name="" />
                <FieldArray name="subtasks">
                  {({ push, remove }) => (
                    <div>
                      {values.subtasks?.length !== 0 && (
                        <h3 className="font-medium pb-4">Included Subtasks</h3>
                      )}
                      {values.subtasks?.map((_, index) => (
                        <SubtaskFields
                          key={index}
                          name={`subtasks.${index}`}
                          task={values.subtasks?.[index] as Task}
                          remove={() => remove(index)}
                          isEditMode={isEditMode}
                        />
                      ))}
                      {!isEditMode && (
                        <button
                          type="button"
                          className="mt-3 text-blue-500 hover:text-blue-700 transition flex items-center"
                          onClick={() =>
                            push({
                              title: '',
                              description: '',
                              status: TaskStatus.TODO,

                              subtasks: [],
                            })
                          }
                        >
                          <PlusIcon size={20} />
                          <span>Add subtask</span>
                        </button>
                      )}
                    </div>
                  )}
                </FieldArray>

                <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-300 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-pink-500 text-white rounded-xl"
                  >
                    {isEditMode ? 'Update' : 'Create'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default TaskFormModal;
