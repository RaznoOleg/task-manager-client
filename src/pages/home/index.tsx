import { getTasks } from '@/api/services/tasks';
import CreateTaskButton from '@/components/Buttons/CreateTaskButton';
import Paginator from '@/components/Paginator';
import SearchBar from '@/components/SearchBar';
import StatusFilter from '@/components/StatusFilter';
import TaskFormModal from '@/components/TaskFormModal';
import TasksList from '@/components/TasksList';
import usePagination from '@/hooks/usePagination';
import useTasks from '@/hooks/useTasks';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const Home = () => {
  const {
    tasks,
    filter,
    filteredTasks,
    selectedTask,
    selectedAddTask,
    isModalOpen,
    setTasks,
    setIsModalOpen,
    setFilteredTasks,
    setFilter,
    handleDelete,
    handleEditTask,
    handleAddSubtask,
    setSelectedTask,
    setSelectedAddTask,
    handleUpdateTask,
    handleCreateTask,
  } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    let updatedTasks = [...tasks];
    if (filter) {
      updatedTasks = updatedTasks.filter((task) => task.status === filter);
    }
    setFilteredTasks(updatedTasks);
  }, [tasks, filter]);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch {
      toast.error('Error fetching tasks');
    }
  };

  const { currentPage, totalPages, currentItems, resetPage, paginate } =
    usePagination(filteredTasks, 12);

  const handleSearch = (query: string) => {
    const lowerQuery = query.toLowerCase();
    const filtered = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerQuery) ||
        task.description?.toLowerCase().includes(lowerQuery),
    );
    setFilteredTasks(filtered);
    resetPage();
  };

  return (
    <div className="container mx-auto p-4 flex flex-col min-h-screen">
      <div className="flex justify-between items-center gap-3 mb-4">
        <SearchBar onSearch={handleSearch} />
        <StatusFilter onFilterChange={setFilter} />
        <CreateTaskButton
          onClick={() => setIsModalOpen(true)}
        ></CreateTaskButton>
      </div>
      <TasksList
        tasks={currentItems}
        onDeleteTask={handleDelete}
        onEditTask={handleEditTask}
        onAddSubtask={handleAddSubtask}
      />
      <Paginator
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={paginate}
      />
      {isModalOpen && (
        <TaskFormModal
          task={selectedTask}
          selectedAddTask={selectedAddTask}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTask(null);
            setSelectedAddTask(null);
          }}
          onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
        />
      )}
    </div>
  );
};
export default Home;
