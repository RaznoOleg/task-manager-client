import { PlusIcon } from 'lucide-react';

interface CreateTaskButtonProps {
  onClick: () => void;
}

const CreateTaskButton = ({ onClick }: CreateTaskButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="font-semibold bg-indigo-500 text-white px-6 py-5 rounded-xl shadow-md w-22 flex align-center hover:shadow-2xl transition-shadow border border-indigo-500"
    >
      <PlusIcon size={20} />
    </button>
  );
};

export default CreateTaskButton;
