import { Eye, Pencil, Trash2, ArrowUpDown, ArrowUp, ArrowDown, Paperclip, FileText } from 'lucide-react';
import { Task, SortField, SortDirection } from '@/types/task';

interface TaskTableProps {
  tasks: Task[];
  sortField: SortField;
  sortDirection: SortDirection;
  onToggleSort: (field: SortField) => void;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

const statusStyles: Record<string, string> = {
  'Backlog': 'bg-muted text-muted-foreground',
  'In Progress': 'bg-info/15 text-info',
  'Blocked': 'bg-destructive/15 text-destructive',
  'Done': 'bg-success/15 text-success'
};

const priorityStyles: Record<string, string> = {
  'Low': 'bg-muted text-muted-foreground',
  'Medium': 'bg-warning/15 text-warning',
  'High': 'bg-warning/25 text-warning',
  'Critical': 'bg-destructive/15 text-destructive'
};

const departmentStyles: Record<string, string> = {
  'Warehouse': 'border-department-warehouse/40 text-department-warehouse',
  'Fleet': 'border-department-fleet/40 text-department-fleet',
  'Procurement': 'border-department-procurement/40 text-department-procurement',
  'Customer Service': 'border-department-customer-service/40 text-department-customer-service'
};

function SortIcon({ field, currentField, direction }: { field: SortField; currentField: SortField; direction: SortDirection }) {
  if (field !== currentField) return <ArrowUpDown className="h-3.5 w-3.5 opacity-50" />;
  return direction === 'asc' ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />;
}

export function TaskTable({ tasks, sortField, sortDirection, onToggleSort, onView, onEdit, onDelete }: TaskTableProps) {
  if (tasks.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-16 bg-card rounded-xl border border-border">
        <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <p className="text-lg font-medium text-foreground mb-1">No tasks found</p>
        <p className="text-sm text-muted-foreground">Try changing filters or add a new task</p>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-card rounded-xl border border-border overflow-hidden card-shadow">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">ID</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Title</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Assignee</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Department</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <button onClick={() => onToggleSort('priority')} className="flex items-center gap-1 hover:text-foreground transition-colors">
                  Priority
                  <SortIcon field="priority" currentField={sortField} direction={sortDirection} />
                </button>
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <button onClick={() => onToggleSort('dueDate')} className="flex items-center gap-1 hover:text-foreground transition-colors">
                  Due Date
                  <SortIcon field="dueDate" currentField={sortField} direction={sortDirection} />
                </button>
              </th>
              <th className="py-3 px-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tags</th>
              <th className="py-3 px-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <Paperclip className="h-3.5 w-3.5 inline" />
              </th>
              <th className="py-3 px-4 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr 
                key={task.id} 
                className={`border-b border-border/50 hover:bg-muted/40 transition-colors ${index % 2 === 0 ? '' : 'bg-muted/20'}`}
              >
                <td className="py-3 px-4">
                  <span className="font-mono text-sm text-primary font-medium">{task.id}</span>
                </td>
                <td className="py-3 px-4">
                  <p className="text-sm font-medium text-foreground line-clamp-1 max-w-[200px]">{task.title}</p>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-foreground">{task.assignee}</span>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded border ${departmentStyles[task.department]}`}>
                    {task.department}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${priorityStyles[task.priority]}`}>
                    {task.priority}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex px-2.5 py-1 text-xs font-semibold rounded-full ${statusStyles[task.status]}`}>
                    {task.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className="text-sm text-muted-foreground font-mono">{task.dueDate}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1 max-w-[120px]">
                    {task.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                    {task.tags.length > 2 && (
                      <span className="px-2 py-0.5 bg-secondary text-muted-foreground text-xs rounded-full">
                        +{task.tags.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-center">
                  <span className="text-sm text-muted-foreground">{task.attachmentsCount}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => onView(task)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                      title="View"
                      aria-label="View task"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEdit(task)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-info hover:bg-info/10 transition-colors"
                      title="Edit"
                      aria-label="Edit task"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(task)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      title="Delete"
                      aria-label="Delete task"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
