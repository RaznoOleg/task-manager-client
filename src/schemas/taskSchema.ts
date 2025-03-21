import { TaskStatus } from '@/types/taskStatus.enum';
import * as Yup from 'yup';

export const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string(),
  status: Yup.string()
    .oneOf(Object.values(TaskStatus))
    .required('Status is required'),
  subtasks: Yup.array().of(Yup.lazy((): Yup.Schema => TaskSchema)),
});
