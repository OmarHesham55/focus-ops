import { X } from 'lucide-react';
import { TaskFilters } from '@/types/task';

interface FilterBarProps {
  filters: TaskFilters;
  onFilterChange: (key: keyof TaskFilters, value: string) => void;
  onClearFilters: () => void;
}

const statusOptions = ['Backlog', 'In Progress', 'Blocked', 'Done'];
const priorityOptions = ['Low', 'Medium', 'High', 'Critical'];
const departmentOptions = ['Warehouse', 'Fleet', 'Procurement', 'Customer Service'];

export function FilterBar({ filters, onFilterChange, onClearFilters }: FilterBarProps) {
  const hasFilters = filters.status || filters.priority || filters.department || filters.dueDateFrom || filters.dueDateTo;

  return (
    <div className="bg-card border-b border-border px-4 py-3 md:px-6">
      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
          className="h-9 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
          aria-label="Filter by status"
        >
          <option value="">All Statuses</option>
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select
          value={filters.priority}
          onChange={(e) => onFilterChange('priority', e.target.value)}
          className="h-9 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
          aria-label="Filter by priority"
        >
          <option value="">All Priorities</option>
          {priorityOptions.map(priority => (
            <option key={priority} value={priority}>{priority}</option>
          ))}
        </select>

        <select
          value={filters.department}
          onChange={(e) => onFilterChange('department', e.target.value)}
          className="h-9 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer"
          aria-label="Filter by department"
        >
          <option value="">All Departments</option>
          {departmentOptions.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">From:</span>
          <input
            type="date"
            value={filters.dueDateFrom}
            onChange={(e) => onFilterChange('dueDateFrom', e.target.value)}
            className="h-9 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">To:</span>
          <input
            type="date"
            value={filters.dueDateTo}
            onChange={(e) => onFilterChange('dueDateTo', e.target.value)}
            className="h-9 px-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {hasFilters && (
          <button
            onClick={onClearFilters}
            className="h-9 px-3 rounded-lg border border-destructive/30 text-destructive bg-destructive/5 hover:bg-destructive/10 text-sm flex items-center gap-1.5 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
            Clear Filters
          </button>
        )}
      </div>
    </div>
  );
}
