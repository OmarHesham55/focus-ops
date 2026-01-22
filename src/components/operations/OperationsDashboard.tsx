import { useState, useCallback, useEffect } from 'react';
import { TopBar } from '@/components/operations/TopBar';
import { FilterBar } from '@/components/operations/FilterBar';
import { SummaryCards } from '@/components/operations/SummaryCards';
import { TaskTable } from '@/components/operations/TaskTable';
import { Pagination } from '@/components/operations/Pagination';
import { TaskFormModal } from '@/components/operations/TaskFormModal';
import { ViewTaskModal } from '@/components/operations/ViewTaskModal';
import { DeleteConfirmModal } from '@/components/operations/DeleteConfirmModal';
import { Toast, ToastMessage } from '@/components/operations/Toast';
import { useTaskManager } from '@/hooks/useTaskManager';
import { Task } from '@/types/task';

export function OperationsDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const {
    tasks,
    filteredCount,
    filters,
    updateFilter,
    clearFilters,
    sortField,
    sortDirection,
    toggleSort,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    statusCounts,
    createTask,
    updateTask,
    deleteTask
  } = useTaskManager();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const addToast = useCallback((type: ToastMessage['type'], message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const handleNewTask = () => {
    setSelectedTask(null);
    setShowFormModal(true);
  };

  const handleView = (task: Task) => {
    setSelectedTask(task);
    setShowViewModal(true);
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setShowFormModal(true);
  };

  const handleEditFromView = () => {
    setShowViewModal(false);
    setShowFormModal(true);
  };

  const handleDelete = (task: Task) => {
    setSelectedTask(task);
    setShowDeleteModal(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    if (selectedTask) {
      updateTask(selectedTask.id, taskData);
      addToast('success', 'Task updated successfully');
    } else {
      createTask(taskData);
      addToast('success', 'Task created successfully');
    }
    setShowFormModal(false);
    setSelectedTask(null);
  };

  const handleConfirmDelete = () => {
    if (selectedTask) {
      deleteTask(selectedTask.id);
      addToast('success', 'Task deleted successfully');
    }
    setShowDeleteModal(false);
    setSelectedTask(null);
  };

  const handleStatusCardClick = (status: string) => {
    updateFilter('status', filters.status === status ? '' : status);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar
        searchValue={filters.search}
        onSearchChange={(value) => updateFilter('search', value)}
        onNewTask={handleNewTask}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(prev => !prev)}
      />
      
      <FilterBar
        filters={filters}
        onFilterChange={updateFilter}
        onClearFilters={clearFilters}
      />

      <main className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <SummaryCards
            counts={statusCounts}
            activeStatus={filters.status}
            onStatusClick={handleStatusCardClick}
          />
          
          <div className="flex-1 flex flex-col gap-4">
            <TaskTable
              tasks={tasks}
              sortField={sortField}
              sortDirection={sortDirection}
              onToggleSort={toggleSort}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={filteredCount}
              onPageChange={setCurrentPage}
              onPageSizeChange={(size) => {
                setPageSize(size);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>
      </main>

      <TaskFormModal
        isOpen={showFormModal}
        task={selectedTask}
        onClose={() => {
          setShowFormModal(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveTask}
      />

      <ViewTaskModal
        isOpen={showViewModal}
        task={selectedTask}
        onClose={() => {
          setShowViewModal(false);
          setSelectedTask(null);
        }}
        onEdit={handleEditFromView}
      />

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        task={selectedTask}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedTask(null);
        }}
        onConfirm={handleConfirmDelete}
      />

      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
