import { ClipboardList, Clock, AlertTriangle, CheckCircle2, LayoutList } from 'lucide-react';

interface SummaryCardsProps {
  counts: {
    total: number;
    backlog: number;
    inProgress: number;
    blocked: number;
    done: number;
  };
  activeStatus: string;
  onStatusClick: (status: string) => void;
}

export function SummaryCards({ counts, activeStatus, onStatusClick }: SummaryCardsProps) {
  const cards = [
    { key: '', label: 'Total', count: counts.total, icon: LayoutList, color: 'bg-primary/10 text-primary' },
    { key: 'Backlog', label: 'Backlog', count: counts.backlog, icon: ClipboardList, color: 'bg-muted text-muted-foreground' },
    { key: 'In Progress', label: 'In Progress', count: counts.inProgress, icon: Clock, color: 'bg-info/10 text-info' },
    { key: 'Blocked', label: 'Blocked', count: counts.blocked, icon: AlertTriangle, color: 'bg-destructive/10 text-destructive' },
    { key: 'Done', label: 'Done', count: counts.done, icon: CheckCircle2, color: 'bg-success/10 text-success' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-1 lg:w-56 shrink-0">
      {cards.map(({ key, label, count, icon: Icon, color }) => (
        <button
          key={key}
          onClick={() => onStatusClick(key)}
          className={`p-4 rounded-xl bg-card border transition-all text-left card-shadow hover:card-shadow-md ${
            activeStatus === key ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/30'
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <div className={`p-2 rounded-lg ${color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <span className="text-2xl font-bold text-foreground">{count}</span>
          </div>
          <p className="text-sm font-medium text-foreground">{label}</p>
        </button>
      ))}
    </div>
  );
}
