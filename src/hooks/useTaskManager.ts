import { useState, useMemo, useCallback } from 'react';
import { Task, TaskFilters, SortField, SortDirection } from '@/types/task';
import { initialTasks } from '@/data/dummyTasks';

const priorityOrder = { 'Low': 1, 'Medium': 2, 'High': 3, 'Critical': 4 };

export function useTaskManager() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filters, setFilters] = useState<TaskFilters>({
    search: '',
    status: '',
    priority: '',
    department: '',
    dueDateFrom: '',
    dueDateTo: ''
  });
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(task =>
        task.id.toLowerCase().includes(searchLower) ||
        task.title.toLowerCase().includes(searchLower) ||
        task.assignee.toLowerCase().includes(searchLower) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // Status filter
    if (filters.status) {
      result = result.filter(task => task.status === filters.status);
    }

    // Priority filter
    if (filters.priority) {
      result = result.filter(task => task.priority === filters.priority);
    }

    // Department filter
    if (filters.department) {
      result = result.filter(task => task.department === filters.department);
    }

    // Due date range filter
    if (filters.dueDateFrom) {
      result = result.filter(task => task.dueDate >= filters.dueDateFrom);
    }
    if (filters.dueDateTo) {
      result = result.filter(task => task.dueDate <= filters.dueDateTo);
    }

    // Sorting
    if (sortField) {
      result.sort((a, b) => {
        let comparison = 0;
        if (sortField === 'dueDate') {
          comparison = a.dueDate.localeCompare(b.dueDate);
        } else if (sortField === 'priority') {
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [tasks, filters, sortField, sortDirection]);

  const paginatedTasks = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredTasks.slice(start, start + pageSize);
  }, [filteredTasks, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredTasks.length / pageSize);

  const statusCounts = useMemo(() => ({
    total: tasks.length,
    backlog: tasks.filter(t => t.status === 'Backlog').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    blocked: tasks.filter(t => t.status === 'Blocked').length,
    done: tasks.filter(t => t.status === 'Done').length
  }), [tasks]);

  const updateFilter = useCallback((key: keyof TaskFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      status: '',
      priority: '',
      department: '',
      dueDateFrom: '',
      dueDateTo: ''
    });
    setCurrentPage(1);
  }, []);

  const toggleSort = useCallback((field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  }, [sortField]);

  const createTask = useCallback((taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const newId = `OPS-${String(tasks.length + 133).padStart(6, '0')}`;
    const newTask: Task = {
      ...taskData,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks(prev => [newTask, ...prev]);
    return newTask;
  }, [tasks.length]);

  const updateTask = useCallback((id: string, taskData: Partial<Task>) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, ...taskData } : task
    ));
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  return {
    tasks: paginatedTasks,
    filteredCount: filteredTasks.length,
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
  };
}
