import { TaskStatus } from '@/types/taskStatus.enum';

interface StatusBadgeProps {
  status: TaskStatus;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusColors: Record<TaskStatus, string> = {
    [TaskStatus.TODO]: 'bg-gray-200 text-gray-700',
    [TaskStatus.IN_PROGRESS]: 'bg-blue-200 text-blue-700',
    [TaskStatus.DONE]: 'bg-green-200 text-green-700',
  };

  return (
    <span
      className={`px-3 py-1 text-sm font-bold rounded-lg ${statusColors[status]}`}
    >
      {status.replace('-', '\u2011').toUpperCase()}
    </span>
  );
};

export default StatusBadge;
