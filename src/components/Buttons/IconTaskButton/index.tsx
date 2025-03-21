import { Edit, PlusCircle, Trash2 } from 'lucide-react';

export enum ButtonType {
  ADD = 'add',
  EDIT = 'edit',
  DELETE = 'delete',
}

interface IconTaskButtonProps {
  onClick: () => void;
  type: ButtonType;
}

const IconTaskButton = ({ onClick, type }: IconTaskButtonProps) => {
  const renderIcon = () => {
    switch (type) {
      case ButtonType.ADD:
        return (
          <PlusCircle className="w-5 h-5 text-green-500 hover:text-green-700 cursor-pointer" />
        );
      case ButtonType.EDIT:
        return (
          <Edit className="w-5 h-5 text-blue-500 hover:text-blue-700 cursor-pointer" />
        );
      case ButtonType.DELETE:
        return (
          <Trash2 className="w-5 h-5 text-red-500 hover:text-red-700 cursor-pointer" />
        );
      default:
        return null;
    }
  };

  return (
    <button
      onClick={onClick}
      className="text-black hover:text-gray-600 transition-colors"
    >
      {renderIcon()}
    </button>
  );
};

export default IconTaskButton;
