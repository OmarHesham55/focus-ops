export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Backlog' | 'In Progress' | 'Blocked' | 'Done';
  assignee: string;
  dueDate: string;
  createdAt: string;
  tags: string[];
  department: 'Warehouse' | 'Fleet' | 'Procurement' | 'Customer Service';
  attachmentsCount: number;
}

export interface TaskFilters {
  search: string;
  status: string;
  priority: string;
  department: string;
  dueDateFrom: string;
  dueDateTo: string;
}

export type SortField = 'dueDate' | 'priority' | null;
export type SortDirection = 'asc' | 'desc';
