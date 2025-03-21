import { useState } from 'react';
import { TaskStatus } from '@/types/taskStatus.enum';
import StatusBadge from '../StatusBadge';
import { FilterIcon } from 'lucide-react';

interface StatusFilterProps {
  onFilterChange: (status: TaskStatus | '') => void;
}

const StatusFilter = ({ onFilterChange }: StatusFilterProps) => {
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | ''>('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (status: TaskStatus | '') => {
    setSelectedStatus(status);
    onFilterChange(status);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="font-semibold bg-indigo-500 text-white px-6 py-5 rounded-xl shadow-md flex justify-center align-center hover:shadow-2xl transition-shadow border border-indigo-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex justify-between items-center">
          <div>
            <FilterIcon size={20} />
          </div>
          {selectedStatus ? (
            <div className="ml-2">
              <StatusBadge status={selectedStatus} />{' '}
            </div>
          ) : (
            ''
          )}
        </div>
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 min-w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <li
            className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg pl-6 pr-5 font-semibold"
            onClick={() => handleSelect('')}
          >
            All
          </li>
          {Object.values(TaskStatus).map((status) => (
            <li
              key={status}
              className="p-2 cursor-pointer hover:bg-gray-100 flex items-center space-x-2 pl-5 pr-5 rounded-lg "
              onClick={() => handleSelect(status)}
            >
              <StatusBadge status={status} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StatusFilter;
