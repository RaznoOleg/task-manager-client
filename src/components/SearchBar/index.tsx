import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [input, setInput] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    onSearch(value);
  };

  return (
    <div className="flex items-center gap-4 bg-white rounded-xl shadow-md px-4 py-3 hover:shadow-2xl transition-shadow w-full border border-gray-200">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        className="p-2 rounded-lg w-full focus:outline-none bg-transparent"
        placeholder="Search for tasks..."
      />
    </div>
  );
};

export default SearchBar;
